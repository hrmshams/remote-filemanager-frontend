import "./App.css"
import FileManager from "./components/fileManager"
import React, { Component } from "react"
import { ENDPOINTS, request } from "./model/requester"

const fileManagerDataProvider = async function (path) {
  return await request(ENDPOINTS.ls, { path })
}
class App extends Component {
  render() {
    return (
      <div>
        <FileManager dataProvider={fileManagerDataProvider} />
      </div>
    )
  }
}

export default App
