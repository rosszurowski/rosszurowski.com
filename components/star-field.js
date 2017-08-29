// @flow

import React, { Component } from 'react';
import Vector from 'lib/vector';
import randf from 'randf';
import fitter from 'canvas-fit';

const POINT_COUNT = 150;
const FRAME_RATE = 1 / 40;
const FRAME_DIFF = 50;

const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;

export default class StarField extends Component<{}> {
  componentDidMount () {
    if (!this.$canvas) return;

    this.ctx = this.$canvas.getContext('2d');
    this.scale = window.devicePixelRatio;
    this.fitCanvas = fitter(this.$canvas, window, this.scale);

    const [width, height] = this.getCanvasSize();

    this.r = Math.min(width, height);
    this.center = new Vector(width * 0.65, height * 0.5);

    this.generatePoints();

    window.addEventListener('resize', this.handleResize);
    this.timer = requestAnimationFrame(this.handleFrameTick);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.timer);
  }

  getCanvasSize = () => {
    if (!this.$canvas) {
      return [0, 0];
    }

    const width = this.$canvas.width / this.scale;
    const height = this.$canvas.height / this.scale;

    return [width, height];
  }

  $canvas: ?HTMLCanvasElement
  scale: number

  ctx: CanvasRenderingContext2D;
  timer: number;
  scale: number;
  r: number;
  fitCanvas: Function;
  center: Vector;
  points = [];

  generatePoints = () => {
    for (let i = 0; i < POINT_COUNT; i++) {
      const p = Vector.create().random(randf(-this.r, this.r)).add(this.center);
      p.depth = randf(0.4, 0.8);
      p.scale = randf(0.5, 1.5);
      p.center = this.center.clone().add({
        x: randf(-FRAME_DIFF, FRAME_DIFF),
        y: randf(-FRAME_DIFF, FRAME_DIFF),
      });
      this.points.push(p);
    }
  };

  handleFrameTick = () => {
    const ctx = this.ctx;
    const scale = this.scale;
    const [width, height] = this.getCanvasSize();

    ctx.save();
    ctx.scale(scale, scale);
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      p.depth += (randf(0.5, 1.0) - p.depth) / 7;
      const color = Math.round(p.depth * 255);
      ctx.fillStyle = rgb(color, color, color);
      p.rotate(p.center, FRAME_RATE);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.scale, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    requestAnimationFrame(this.handleFrameTick);
  };

  handleResize = () => {
    this.fitCanvas();

    const [width, height] = this.getCanvasSize();
    const center = new Vector(width / 2, height / 2);

    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      const position = Vector.create()
        .random(randf(-this.r, this.r))
        .add(p.center);
      p.center = center.clone().add({
        x: randf(-FRAME_DIFF, FRAME_DIFF),
        y: randf(-FRAME_DIFF, FRAME_DIFF),
      });
      p.set(position);
    }
  };

  render () {
    return <canvas ref={el => (this.$canvas = el)} />;
  }
}
