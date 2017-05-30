import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollMonitor from 'scrollmonitor';
import Icon from 'components/japan/icon';

import config from 'lib/config';
import utils from 'lib/utils';

class PostVideo extends Component {
  static propTypes = {
    children: PropTypes.any,
    srcId: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    withAudio: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    width: 16,
    height: 9,
    withAudio: false,
  }

  state = {
    muted: true,
  }

  componentDidMount () {
    this.elementWatcher = scrollMonitor.create(this.$video);
    this.elementWatcher.enterViewport(this.handleEnterViewport);
    this.elementWatcher.exitViewport(this.handleLeaveViewport);
  }

  componentWillUnmount () {
    this.elementWatcher.destroy();
  }

  handleEnterViewport = () => {
    this.$video.play();
  }

  handleLeaveViewport = () => {
    this.$video.pause();
    this.setState({ muted: true });
  }

  handleMuteButtonClick = () => {
    const { muted } = this.state;
    const nextMutedState = !muted;

    if (nextMutedState === false) {
      this.$video.pause();
      this.$video.currentTime = 0;
      this.$video.play();
    }
    this.setState({ muted: nextMutedState });
  }

  render () {
    const { children, srcId, width, height, withAudio, ...rest } = this.props;
    const { muted } = this.state;

    return (
      <figure style={{ paddingBottom: `${(height / width) * 100}%` }}>
        {withAudio && (
          <button className="mute-button" onClick={this.handleMuteButtonClick}>
            <Icon fill="#fff" size={24} icon={muted ? 'volumeOff' : 'volumeFull'} />
          </button>
        )}
        <video ref={el => (this.$video = el)} loop muted={!withAudio || muted} {...rest}>
          <source src={utils.getAssetUrl(`2017/japan/${srcId}.webm`)} type="video/webm" />
          <source src={utils.getAssetUrl(`2017/japan/${srcId}.mp4`)} type="video/mp4" />
        </video>
        <style jsx>{`
          figure {
            background: #f2f2f2;
            position: relative;
          }

          video {
            position: absolute;
            height: 100%;
            width: 100%;
          }

          .mute-button {
            position: absolute;
            padding: 0.4rem;
            top: 0.8rem;
            left: 0.8rem;
            color: #fff;
            cursor: pointer;
            z-index: 9;
            opacity: 0.6;
            transition: opacity 150ms ease;
          }

          .mute-button:hover {
            opacity: 1.0;
          }
        `}</style>
      </figure>
    );
  }
}

export default PostVideo;
