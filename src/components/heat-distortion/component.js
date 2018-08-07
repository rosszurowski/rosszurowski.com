// @flow

import React, { Component } from 'react';
import Canvas from 'react-responsive-canvas';
import styled from 'react-emotion';
import HeatDistortionProgram from './program';

const StyledContainer = styled.div`
  position: relative;
  height: 100%;

  & canvas {
    transition: opacity 1200ms ease;
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
      <StyledContainer innerRef={this.containerRef}>
        <Canvas
          className={this.state.hasRendered ? 'o-100p' : 'o-0p'}
          canvasRef={el => (this.canvasRef = el)}
          onResize={this.handleResize}
        />
      </StyledContainer>
    );
  }
}
