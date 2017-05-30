/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

if (typeof global.window !== 'undefined') {
  global.window.lazySizesConfig = window.lazySizesConfig || {};
  global.window.lazySizesConfig.lazyClass = 'js-lazysizes';
  global.window.lazySizesConfig.preloadClass = 'js-lazysizes-preload';
  global.window.lazySizesConfig.loadedClass = 'js-lazysizes-loaded';
  global.window.lazySizesConfig.expFactor = 2.0;

  require('lazysizes/plugins/attrchange/ls.attrchange.js');
  require('lazysizes');
}

const LazyloadImage = ({ srcSet, alt, width, height, preload }) => (
  <span>
    <img
      src="data:image/gif;base64,R0lGODlhAQABAPAAAPLy8v///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
      alt={alt}
      data-srcset={Array.isArray(srcSet) ? srcSet.join(', ') : srcSet}
      data-sizes="auto"
      className={`js-lazysizes ${preload ? 'js-lazysizes-preload' : ''}`} />
    <canvas width={width} height={height} />
    <style jsx>{`
      span {
        display: inline-block;
        position: relative;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.0;
        transition: opacity 200ms ease;
        will-change: opacity;
      }

      img.js-lazysizes-loaded {
        opacity: 1.0;
      }

      canvas {
        background-color: #f2f2f2;
      }
    `}</style>
  </span>
);

LazyloadImage.propTypes = {
  srcSet: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  preload: PropTypes.bool,
};

LazyloadImage.defaultProps = {
  alt: undefined,
  width: undefined,
  height: undefined,
  preload: false,
};

export default LazyloadImage;
