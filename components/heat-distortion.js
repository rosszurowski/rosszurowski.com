// @flow

import React, { Component } from 'react';
import fit from 'canvas-fit';

import { getContext, createProgram, createShader, createTexture, createUniform, setRectangle } from 'lib/glsl';

import type { WebGLTexture2DSource } from 'lib/glsl';

const fragmentSource = `
  precision mediump float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform sampler2D u_image;

  varying vec2 v_texCoord;

  vec2 pixel() {
    float dpi = 2.0;
    return vec2(1.0 * dpi) / u_resolution;
  }

  float wave(float val, float freq, float speed) {
    return sin(val * freq + ((u_time * (3.141 / 2.0)) * speed));
  }

  vec2 waves(vec2 pos) {
    vec2 intensity = vec2(4, 2) * pixel();
    vec2 waves = vec2(
      wave(pos.y, 200.0, 0.02),
      wave(pos.x, 80.0, 0.05)
    );

    return pos + (waves * intensity);
  }

  void main() {
    vec4 color = texture2D(u_image, waves(v_texCoord));

    gl_FragColor = color;
  }
`;

const vertexSource = `
  precision mediump float;

  attribute vec2 a_position;
  attribute vec2 a_texCoord;

  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  vec2 toClipSpace(vec2 position, vec2 resolution) {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipspace = (zeroToTwo - 1.0) * vec2(1, -1);
    return clipspace;
  }

  void main() {
    gl_Position = vec4(toClipSpace(a_position, u_resolution), 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// eslint-disable-next-line no-unused-vars
const noop = (...rest) => {};

const initScene = (gl: WebGLRenderingContext, textureSource: WebGLTexture2DSource): Object => {
  const width = gl.canvas.width;
  const height = gl.canvas.height;

  const fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
  const vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER);

  const program = createProgram(gl, fragmentShader, vertexShader);
  gl.useProgram(program);

  /**
   * Program code
   */

  const buffers = {};
  buffers.position = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  setRectangle(gl, 0, 0, width, height);

  buffers.texCoord = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoord);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);

  createTexture(gl, textureSource);

  const uniforms = {};
  uniforms.resolution = gl.getUniformLocation(program, 'u_resolution');
  uniforms.time = gl.getUniformLocation(program, 'u_time');

  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0.0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.enable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);

  const attributes = {};
  attributes.position = gl.getAttribLocation(program, 'a_position');
  attributes.texCoord = gl.getAttribLocation(program, 'a_texCoord');

  gl.enableVertexAttribArray(attributes.position);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(attributes.position, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(attributes.texCoord);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoord);
  gl.vertexAttribPointer(attributes.texCoord, 2, gl.FLOAT, false, 0, 0);

  gl.uniform2f(uniforms.resolution, width, height);
  gl.uniform1f(uniforms.time, 0);

  draw(gl);

  return { program, attributes, buffers, uniforms };
};

const draw = (gl: WebGLRenderingContext) => {
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const getRenderableSVG = (html: string, width: number, height: number) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${html}
      </div>
    </foreignObject>
  </svg>
`;

let getSVGImage;

if (typeof global.window !== 'undefined') {
  const w = global.window.URL || global.window.webkitURL || global.window;

  getSVGImage = (ctx: CanvasRenderingContext2D, html: string): Promise<HTMLImageElement> =>
    new Promise(resolve => {
      if (!w) return;

      // NOTE: multiplying by 2x here to get a higher resolution for type
      // rendering. Look into better ways of solving this.
      const data = getRenderableSVG(html, ctx.canvas.width / 2, ctx.canvas.height / 2);
      const img = new Image();

      img.onload = () => {
        resolve(img);
      };

      img.crossOrigin = 'anonymous';
      img.src = `data:image/svg+xml;charset=utf-8,${data}`;
    });
}

type Props = {
  html: string,
};

type State = {
  hasRendered: boolean,
};

export default class HeatDistortion extends Component<Props, State> {
  props: Props;

  state = {
    hasRendered: false,
  };

  componentDidMount() {
    if (!this.$canvas) return;
    if (!this.$root) return;

    this.gl = getContext(this.$canvas);

    this.$textCanvas = document.createElement('canvas');
    this.textCtx = this.$textCanvas.getContext('2d');

    this.fit = () => {
      if (this.$canvas) {
        if (this.$root) {
          const { $root } = this;
          fit(this.$canvas, $root, window.devicePixelRatio);
          fit(this.$textCanvas, $root, window.devicePixelRatio);
        }
        this.gl.viewport(0, 0, this.$canvas.width, this.$canvas.height);
      }
    };

    this.fit();
    window.addEventListener('resize', this.handleResize, false);

    requestAnimationFrame(() => {
      getSVGImage(this.textCtx, this.props.html).then(image => {
        const scene = initScene(this.gl, image);
        this.program = scene.program;
        this.attributes = scene.attributes;
        this.buffers = scene.buffers;
        this.uniforms = scene.uniforms;
        this.tick();
        this.setState({ hasRendered: true });
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  fit: Function;
  $root: ?HTMLElement;
  $canvas: ?HTMLCanvasElement;
  $textCanvas: ?HTMLCanvasElement;
  textCtx: CanvasRenderingContext2D;
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  attributes: Object;
  buffers: Object;
  uniforms: Object;
  frame: number = 0;

  tick = () => {
    createUniform(this.gl, this.program, '1f', 'u_time', this.frame);
    draw(this.gl);
    this.frame++;
    requestAnimationFrame(this.tick);
  };

  handleResize = () => {
    this.fit();
    if (this.$canvas) {
      const { width, height } = this.$canvas;
      const { buffers, uniforms } = this;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.position);
      setRectangle(this.gl, 0, 0, width, height);
      getSVGImage(this.textCtx, this.props.html).then(image => {
        createTexture(this.gl, image);
      });
      this.gl.uniform2f(uniforms.resolution, width, height);
      this.gl.viewport(0, 0, width, height);
    }
  };

  render() {
    return (
      <div ref={el => (this.$root = el)}>
        <canvas className={this.state.hasRendered ? 'is-ready' : ''} ref={el => (this.$canvas = el)} width={600} height={600} />
        <style jsx>{`
          div {
            position: relative;
            height: 100%;
          }

          canvas {
            opacity: 0;
            transition: opacity 1200ms ease;
          }

          canvas.is-ready {
            opacity: 1;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }
}
