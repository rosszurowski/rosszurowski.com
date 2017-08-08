// @flow

import React, { Component } from 'react';
import fit from 'canvas-fit';
import { getContext, createProgram, createShader, createTexture, setRectangle } from 'lib/glsl';
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

  float wave(float x, float freq, float speed) {
    return sin(x * freq + ((u_time * (3.141 / 2.0)) * speed));
  }

  vec2 waves(vec2 pos) {
    float mask = texture2D(u_image, pos).g;
    vec2 intensity = vec2(2.0, 1.0) * pixel();
    vec2 waves = vec2(
      wave(pos.y, 90.0, 0.25),
      wave(pos.x, 20.0, 0.4)
    );

    return pos + (waves * intensity);
  }

  vec2 depth(vec2 pos) {
    vec2 intensity = vec2(0.002, 0.002);
    float d = 0.0 - pow(texture2D(u_image, pos).r, 1.0);
    return pos + (intensity * d);
  }

  void main() {
    vec2 turbulence = waves(depth(v_texCoord));
    gl_FragColor = texture2D(u_image, turbulence);
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

const initScene = (gl: WebGLRenderingContext, textureSource: WebGLTexture2DSource): WebGLProgram => {
  const width = gl.canvas.width / 2;
  const height = gl.canvas.height / 2;

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
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0,
  ]), gl.STATIC_DRAW);

  createTexture(gl, textureSource);

  const uniforms = {};
  uniforms.resolution = gl.getUniformLocation(program, 'u_resolution');
  uniforms.time = gl.getUniformLocation(program, 'u_time');

  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0.0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

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

  return program;
};

const draw = (gl: WebGLRenderingContext) => {
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const getRenderableSVG = (html:string, width:number, height:number) => `
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

  getSVGImage = (ctx: CanvasRenderingContext2D, html:string): Promise<HTMLImageElement> => new Promise((resolve) => {
    if (!w) return;

    const data = getRenderableSVG(html, ctx.canvas.width, ctx.canvas.height);
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.crossOrigin = 'anonymous';
    img.src = `data:image/svg+xml;charset=utf-8,${data}`;
  });
}

export default class HeatDistortion extends Component {
  componentDidMount () {
    if (!this.canvas) return;

    this.gl = getContext(this.canvas);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    this.fit = () => {
      fit(this.canvas, window, window.devicePixelRatio);
      fit(canvas, window, window.devicePixelRatio);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    };

    this.fit();
    window.addEventListener('resize', this.handleResize, false);

    requestAnimationFrame(() => {
      getSVGImage(ctx, `
        <div style="font-size: 96px; font-family: 'Calibre', sans-serif; font-weight: 300; letter-spacing: 0.05px;">
          <span style="color:white;">Biff! Pow! Bop!</span>
        </div>
      `).then((image) => {
        this.program = initScene(this.gl, image);
        this.tick();
      });
    });
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize, false);
  }

  fit: Function
  canvas: HTMLCanvasElement
  gl: WebGLRenderingContext
  program: WebGLProgram
  frame: number = 0

  tick = () => {
    const time = this.gl.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(time, this.frame);
    draw(this.gl);
    this.frame++;
    requestAnimationFrame(this.tick);
  }

  handleResize = () => {
    this.fit();
  }

  render () {
    return <canvas ref={el => (this.canvas = el)} width={600} height={600} />;
  }
}
