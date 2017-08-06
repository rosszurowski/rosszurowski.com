// @flow

import React, { Component } from 'react';
import fit from 'canvas-fit';
import { getContext, createProgram, createShader } from 'lib/glsl';

import fragmentSource from 'lib/shaders/heat-distortion.frag';
import vertexSource from 'lib/shaders/heat-distortion.vert';

// eslint-disable-next-line no-unused-vars
const noop = (...rest) => {};

const ITEM_SIZE = 2;

const initScene = (gl: WebGLRenderingContext, width: number, height: number): void => {
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0.0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
  const vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER);

  const program = createProgram(gl, fragmentShader, vertexShader);
  const attributes = {};

  const aspectRatio = width / height;
  const vertices = new Float32Array([
    -0.5, 0.3 * aspectRatio, 0.5, 0.5 * aspectRatio, 0.5, -0.5 * aspectRatio,
    -0.5, 0.5 * aspectRatio, 0.5, -0.5 * aspectRatio, -0.5, -0.5 * aspectRatio,
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.useProgram(program);

  const items = vertices.length / ITEM_SIZE;

  attributes.uColor = gl.getUniformLocation(program, 'uColor');
  gl.uniform4fv(attributes.uColor, [0.9, 0.5, 0.6, 1.0]);

  attributes.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  gl.enableVertexAttribArray(attributes.aVertexPosition);
  gl.vertexAttribPointer(attributes.aVertexPosition, ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, items);
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

// let renderHTMLToCanvas;
//
// if (typeof global.window !== 'undefined') {
//   const w = global.window.URL || global.window.webkitURL || global.window;
//
//   renderHTMLToCanvas = (ctx: CanvasRenderingContext2D, html: string): void => {
//     if (!w) return;
//
//     const data = getRenderableSVG(html, ctx.canvas.width, ctx.canvas.height);
//     const img = new Image();
//     const svg = new Blob([data], { type: 'image/svg+xml' });
//     const url = w.createObjectURL(svg);
//
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0);
//       w.revokeObjectURL(url);
//     };
//
//     img.src = url;
//   };
// }

export default class HeatDistortion extends Component {
  componentDidMount () {
    if (!this.canvas) return;

    this.fit = fit(this.canvas, window, window.devicePixelRatio);
    this.ctx = getContext(this.canvas);

    initScene(this.ctx, this.canvas.width, this.canvas.height);

    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize, false);
  }

  fit: Function
  canvas: HTMLCanvasElement
  ctx: WebGLRenderingContext

  handleResize = () => {
    this.fit();
  }

  // draw = () => {
  //   renderHTMLToCanvas(this.ctx, `
  //     <div style="padding: 80px; font-size: 300px; font-family: 'Calibre', sans-serif;">
  //       <span style="color:white;">hello</span>
  //     </div>
  //   `);
  // }

  render () {
    return <canvas ref={el => (this.canvas = el)} width={600} height={600} />;
  }
}
