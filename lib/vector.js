class Vector {
  constructor (x, y) {
    if (typeof x === 'object') {
      this.x = x.x || 0;
      this.y = x.y || 0;
    } else {
      this.x = x || 0;
      this.y = y || 0;
    }
  }

  static create () {
    return new Vector();
  }

  /**
   * Returns a new instance of Vector with
   * this vector's components.
   * @return {Vector} a clone of this vector
   */
  clone () {
    return new Vector(this.x, this.y);
  }

  /**
   * Copies the x, y components from the specified
   * Vector. Any undefined components from `otherVec`
   * will default to zero.
   *
   * @param  {otherVec} the other Vector to copy
   * @return {Vector}  this, for chaining
   */
  copy (otherVec) {
    this.x = otherVec.x || 0;
    this.y = otherVec.y || 0;
    return this;
  }

  /**
   * A convenience function to set the components of
   * this vector as x and y. Falsy or undefined
   * parameters will default to zero.
   *
   * You can also pass a vector object instead of
   * individual components, to copy the object's components.
   *
   * @param {Number} x the x component
   * @param {Number} y the y component
   * @return {Vector}  this, for chaining
   */
  set (x, y) {
    if (typeof x === 'object') {
      this.x = x.x || 0;
      this.y = x.y || 0;
    } else {
      this.x = x || 0;
      this.y = y || 0;
    }
    return this;
  }

  add (v)  {
    this.x += v.x;
    this.y += v.y;
    return this;
  };

  subtract (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  multiply (v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  scale (s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  divide (v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }

  negate () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  rotate (center, deg) {
    const radians = (Math.PI / 180) * deg;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    this.x = (cos * (this.x - center.x)) + (sin * (this.y - center.y)) + center.x;
    this.y = ((cos * (this.y - center.y)) - (sin * (this.x - center.x))) + center.y;
    return this;
  }

  distance (v) {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return Math.sqrt((dx * dx) + (dy * dy));
  }

  distanceSq (v) {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return (dx * dx) + (dy * dy);
  }

  length () {
    const x = this.x;
    const y = this.y;
    return Math.sqrt((x * x) + (y * y));
  }

  lengthSq () {
    const { x, y } = this;
    return (x * x) + (y * y);
  }

  normalize () {
    const { x, y } = this;
    let len = (x * x) + (y * y);
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      this.x = x * len;
      this.y = y * len;
    }
    return this;
  }

  dot (v) {
    return (this.x * v.x) + (this.y * v.y);
  }

  // Unlike Vector3, this returns a scalar
  // http://allenchou.net/2013/07/cross-product-of-2d-vectors/
  cross (v) {
    return (this.x * v.y) - (this.y * v.x);
  }

  lerp (v, t = 0) {
    const ax = this.x;
    const ay = this.y;
    this.x = ax + (t * (v.x - ax));
    this.y = ay + (t * (v.y - ay));
    return this;
  }

  reset () {
    this.x = 0;
    this.y = 0;
    return this;
  }

  random (scale = 1.0) {
    const r = Math.random() * 2.0 * Math.PI;
    this.x = Math.cos(r) * scale;
    this.y = Math.sin(r) * scale;
    return this;
  }

  toString () {
    return `Vector(${this.x}, ${this.y})`;
  }
}

export default Vector;
