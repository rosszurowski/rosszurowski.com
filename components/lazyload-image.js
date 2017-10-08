// @flow
/* eslint-disable global-require */

import React from 'react';

if (typeof global.window !== 'undefined') {
  global.window.lazySizesConfig = window.lazySizesConfig || {};
  global.window.lazySizesConfig.lazyClass = 'js-lazysizes';
  global.window.lazySizesConfig.preloadClass = 'js-lazysizes-preload';
  global.window.lazySizesConfig.loadedClass = 'js-lazysizes-loaded';
  global.window.lazySizesConfig.expFactor = 2.0;

  require('lazysizes/plugins/attrchange/ls.attrchange.js');
  require('lazysizes');
}

const first = arr => arr[0];
const removeWidth = str => str.replace(/\s*\d+(w|x)$/, '');

type Props = {
  srcSet: Array<string>,
  alt?: string,
  width?: number,
  height?: number,
  preload: boolean,
};

const LazyloadImage = ({ srcSet, alt, width, height, preload }: Props) => (
  <span>
    <img
      src={removeWidth(first(srcSet))}
      srcSet="data:image/gif;base64,R0lGODlhAQABAPAAAPLy8v///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
      alt={alt}
      data-srcset={srcSet.join(', ')}
      data-sizes="auto"
      className={`js-lazysizes ${preload ? 'js-lazysizes-preload' : ''}`}
    />
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
        opacity: 0;
        transition: opacity 200ms ease;
        will-change: opacity;
      }

      img.js-lazysizes-loaded {
        opacity: 1;
      }

      canvas {
        background-color: #f2f2f2;
      }
    `}</style>
  </span>
);

LazyloadImage.defaultProps = {
  alt: undefined,
  width: undefined,
  height: undefined,
  preload: false,
};

export default LazyloadImage;
