import React, { Component } from 'react';
import Vector from 'lib/vector';
import randf from 'randf';
import loop from 'canvas-loop';

const POINT_COUNT = 150;
const FRAME_RATE = 1 / 40;
const FRAME_DIFF = 50;

const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;

export default class StarField extends Component {
  componentDidMount () {
    this.ctx = this.$canvas.getContext('2d');
    this.app = loop(this.$canvas, { scale: window.devicePixelRatio });
    this.app.on('tick', this.handleFrameTick);
    this.app.on('resize', this.handleResize);

    const [width, height] = this.app.shape;

    this.r = Math.min(width, height);
    this.center = new Vector(width * 0.65, height * 0.5);

    this.generatePoints();

    this.app.start();
  }

  componentWillUnmount () {
    if (this.app) {
      this.app.stop();
    }
  }

  ctx = null;
  app = null;
  r = null;
  center = null;
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
    const scale = this.app.scale;
    const [width, height] = this.app.shape;

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
  };

  handleResize = () => {
    const { shape } = this.app;
    const [width, height] = shape;
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
