import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


export default class Player extends React.Component {
  player: any;
  videoNode: any;
  props: any;

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
    this.player.fluid(true);
    // this.player.fill(true);
  }
  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video poster={this.props.posterURL} onTimeUpdate={this.props.handlePlay} style={{ outline: 'none' }} className="vjs-matrix video-js transition-all duration-150" preload="none" ref={node => this.videoNode = node}></video>
        </div>
      </div>
    )
  }
}
