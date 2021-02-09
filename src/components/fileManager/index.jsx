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

export default class FileManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultPath: "",
      path: [],
    }
    this.wholeContent = undefined
  }

  async componentDidMount() {
    const initialData = await this.props.dataProvider()
    if (initialData.status === 1) {
      this.wholeContent = initialData.data.dirs
      this.setState({
        defaultPath: initialData.data.path,
      })
    }
  }

  _createBreadcrumbItems = () => {
    const defaultPathBreadcrumb = (
      <Breadcrumb.Item>
        <TextButton
          onClick={() => {
            this.setState({
              path: [],
            })
          }}
        >
          {this.state.defaultPath}
        </TextButton>
      </Breadcrumb.Item>
    )

    const path = this.state.path.map((p) => (
      <Breadcrumb.Item>
        <TextButton
          onClick={() => {
            this.setState({
              path: this.state.path.slice(0, p.level),
            })
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
    let content = this.wholeContent
    for (let p of pathArr) {
      content = content[p.id].content
    }

    return content
  }

  _setPathSubContent = async (defaultPath, pathArr) => {
    let path = defaultPath
    let desiredFolderRef
    let content = this.wholeContent

    for (let p of pathArr) {
      path = path + "\\\\" + p.text
      desiredFolderRef = content[p.id]
      content = desiredFolderRef.content
    }

    const res = await this.props.dataProvider(path)
    if (res.status === 1) {
      desiredFolderRef.content = res.data.dirs
    }
  }

  onListItemClick = async (type, text, id) => {
    const _folderOnClick = async (text) => {
      let path = this.state.path
      path.push({ text, id, level: this.state.path.length + 1 })

      if (!this._getPathSubContent(path)) {
        await this._setPathSubContent(this.state.defaultPath, path)
      }
      this.setState({ path })
    }
    const _videoOnClick = () => {}
    const _soundOnClick = () => {}

    if (type === "folder") {
      await _folderOnClick(text)
    } else if (type === "video") {
    } else if (type === "sound") {
    } else {
      alert(text)
    }
  }

  render() {
    const content = this._getPathSubContent(this.state.path)

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
