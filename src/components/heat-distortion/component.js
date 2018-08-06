// @flow

import React, { Component } from 'react';
import Canvas from 'react-responsive-canvas';
import { css } from 'react-emotion';
import HeatDistortionProgram from './program';

const className = css`
  position: relative;
  height: 100%;

  & canvas {
    transition: opacity 1200ms ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

type Props = {
  html: string,
};

type State = {
  hasRendered: boolean,
};

export default class HeatDistortion extends Component<Props, State> {
  state = {
    hasRendered: false,
  };

  containerRef = React.createRef();
  canvasRef: HTMLCanvasElement;
  program: HeatDistortionProgram;

  componentDidMount() {
    this.program = new HeatDistortionProgram(this.canvasRef, this.props.html);
    this.program.start(() => {
      this.setState({ hasRendered: true });
    });
  }

  componentWillUnmount() {
    this.program.destroy();
  }

  handleResize = () => {
    this.program.handleResize();
  };

  render() {
    return (
      <div className={className} ref={this.containerRef}>
        <Canvas
          className={this.state.hasRendered ? 'o-100p' : 'o-0p'}
          canvasRef={el => (this.canvasRef = el)}
          onResize={this.handleResize}
        />
      </div>
    );
  }
}
