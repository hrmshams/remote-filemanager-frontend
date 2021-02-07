import React, { Component } from "react"

import { Breadcrumb, List } from "antd"
import {
  FileTextTwoTone,
  FileTwoTone,
  FolderTwoTone,
  PictureTwoTone,
  SoundTwoTone,
  VideoCameraTwoTone,
} from "@ant-design/icons"
import data from "./fakeData"
import "./styles.css"
import TextButton from "./../textButton"

const iconsStyles = {
  fontSize: "20px",
}
const icons = {
  folder: <FolderTwoTone style={iconsStyles} twoToneColor="#f2c222" />,
  video: <VideoCameraTwoTone style={iconsStyles} twoToneColor="#828282" />,
  sound: <SoundTwoTone style={iconsStyles} twoToneColor="#828282" />,
  picture: <PictureTwoTone style={iconsStyles} />,
  text: <FileTextTwoTone style={iconsStyles} />,
  unknown: <FileTwoTone style={iconsStyles} />,
}

export default class FileManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultPath: ["d:", "my works"],
      path: [],
    }
  }

  _createBreadcrumbItems = () => {
    const defaultPath = this.state.defaultPath.map((dp) => (
      <Breadcrumb.Item>
        <TextButton
          onClick={() => {
            this.setState({
              path: [],
            })
          }}
        >
          {dp}
        </TextButton>
      </Breadcrumb.Item>
    ))

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

    return defaultPath.concat(path)
  }

  onItemClick = (type, text, id) => {
    const _folderOnClick = (text) => {
      let path = this.state.path
      path.push({ text, id, level: this.state.path.length + 1 })

      this.setState({ path })
    }
    const _videoOnClick = () => {}
    const _soundOnClick = () => {}

    if (type === "folder") {
      _folderOnClick(text)
    } else if (type === "video") {
    } else if (type === "sound") {
    } else {
      alert(text)
    }
  }

  render() {
    let folderContent = data
    for (let p of this.state.path) {
      folderContent = folderContent[p.id].content
    }

    return (
      <div className="filemanager">
        <div>
          <Breadcrumb>{this._createBreadcrumbItems()}</Breadcrumb>
        </div>
        <div className="filemanager-list">
          <List
            itemLayout="horizontal"
            dataSource={folderContent}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={icons[item.type]}
                  title={
                    <TextButton
                      onClick={() => {
                        this.onItemClick(item.type, item.title, index)
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
      </div>
    )
  }
}
