import React, { Component } from "react"

import { Breadcrumb, List, Skeleton } from "antd"
import { FolderOutlined } from "@ant-design/icons"
import data from "./fakeData"
import "./styles.css"

export default class FileManager extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="filemanager">
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="filemanager-list">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<FolderOutlined />}
                    title={<a href="#">{item.title}</a>}
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}
