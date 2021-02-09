import React, { Component } from "react"

import { Breadcrumb, List, Spin } from "antd"
import {
  FileTextTwoTone,
  FileTwoTone,
  FolderTwoTone,
  PictureTwoTone,
  SoundTwoTone,
  VideoCameraTwoTone,
} from "@ant-design/icons"
// import data from "./fakeData"

import "./styles.css"
import TextButton from "./../textButton"

import Store from "../../model/Store"
import ExtendableStore from "../../model/Store/extendableStore"
import { observer } from "mobx-react"

var base64 = require("base-64")
var utf8 = require("utf8")

const iconsStyles = {
  fontSize: "20px",
}
const icons = {
  folder: <FolderTwoTone style={iconsStyles} twoToneColor="#f2c222" />,
  video: <VideoCameraTwoTone style={iconsStyles} twoToneColor="#828282" />,
  audio: <SoundTwoTone style={iconsStyles} twoToneColor="#828282" />,
  picture: <PictureTwoTone style={iconsStyles} />,
  text: <FileTextTwoTone style={iconsStyles} />,
  unknown: <FileTwoTone style={iconsStyles} />,
}

class FileManager extends Component {
  async componentDidMount() {
    if (
      Store.filemanager.defaultPath &&
      ExtendableStore.filemanager.wholeContent
    )
      return

    const initialData = await this.props.dataProvider()
    if (initialData.status === 1) {
      ExtendableStore.setWholeContent(initialData.data.dirs)

      Store.filemanager.setDefaultPath(initialData.data.path)
    }
  }

  _createBreadcrumbItems = () => {
    const defaultPathBreadcrumb = (
      <Breadcrumb.Item>
        <TextButton
          onClick={() => {
            Store.filemanager.setPath([])
          }}
        >
          {Store.filemanager.defaultPath}
        </TextButton>
      </Breadcrumb.Item>
    )

    const path = Store.filemanager.path.map((p) => (
      <Breadcrumb.Item>
        <TextButton
          onClick={() => {
            Store.filemanager.setPath(Store.filemanager.path.slice(0, p.level))
          }}
        >
          {p.text}
        </TextButton>
      </Breadcrumb.Item>
    ))

    path.unshift(defaultPathBreadcrumb)
    return path
  }

  _getPathSubContent = (pathArr) => {
    let content = ExtendableStore.filemanager.wholeContent

    for (let p of pathArr) {
      content = content[p.id].content
    }

    return content
  }

  _setPathSubContent = async (defaultPath, pathArr) => {
    let path = defaultPath
    for (let p of pathArr) {
      path = path + "\\\\" + p.text
    }

    const res = await this.props.dataProvider(path)
    if (res.status === 1) {
      ExtendableStore.extendWholeContent(pathArr, res.data.dirs)
    }
  }

  onListItemClick = async (type, text, id) => {
    const _createFullPath = () => {
      let filePath = Store.filemanager.defaultPath

      for (let p of Store.filemanager.path) {
        filePath += p.text + "\\"
      }
      filePath += text

      return filePath
    }

    const _folderOnClick = async (text) => {
      let { defaultPath } = Store.filemanager
      let newPath = [...Store.filemanager.path]
      newPath.push({ text, id, level: newPath.length + 1 })

      if (!this._getPathSubContent(newPath)) {
        await this._setPathSubContent(defaultPath, newPath)
      }
      Store.filemanager.setPath(newPath)
    }
    const _videoOnClick = (text) => {
      const base64Path = base64.encode(utf8.encode(_createFullPath()))
      this.props.history.push("/video/" + base64Path, { filename: text })
    }
    const _soundOnClick = () => {}

    if (type === "folder") {
      await _folderOnClick(text)
    } else if (type === "video") {
      _videoOnClick(text)
    } else if (type === "sound") {
    } else {
      alert(text)
    }
  }

  render() {
    const { path } = Store.filemanager
    const content = this._getPathSubContent(path)

    return (
      <div className="filemanager">
        <div>
          <Breadcrumb>{this._createBreadcrumbItems()}</Breadcrumb>
        </div>

        {content ? (
          <div className="filemanager-list">
            <List
              itemLayout="horizontal"
              dataSource={content}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={icons[item.type]}
                    title={
                      <TextButton
                        onClick={() => {
                          this.onListItemClick(item.type, item.title, index)
                        }}
                        size={14}
                      >
                        {item.title}
                      </TextButton>
                    }
                  />
                  {/* TODO : size of file */}
                  <div></div>
                </List.Item>
              )}
            />
          </div>
        ) : (
          <Spin size="large" />
        )}
      </div>
    )
  }
}

export default observer(FileManager)
