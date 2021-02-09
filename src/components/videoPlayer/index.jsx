import React, { Component } from "react"
import "./styles.css"

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.baseUrl = ""
    if (process.env.NODE_ENV === "development") {
      this.baseUrl = "http://localhost:3030"
    }
  }
  render() {
    return (
      <div class="video-container">
        <div>Video Player</div>

        <video class="video-player" controls>
          <source src={this.baseUrl + "/video"} type="video/mp4" />
          {/* <track
            label="English"
            kind="subtitles"
            srclang="en"
            src="/data/stest"
            default
          /> */}
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
}
