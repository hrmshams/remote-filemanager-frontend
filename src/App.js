import "./App.css"
import FileManager from "./components/fileManager"
import React, { Component } from "react"
import { ENDPOINTS, request } from "./model/requester"
import { Route, Switch } from "react-router-dom"
import VideoPlayer from "./components/videoPlayer"

const fileManagerDataProvider = async function (path) {
  return await request(ENDPOINTS.ls, { path })
}
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/video/:id">
            <VideoPlayer />
          </Route>
          <Route path="/">
            <FileManager dataProvider={fileManagerDataProvider} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App
