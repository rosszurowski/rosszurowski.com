import React from 'react';

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.lazyClass = 'js-lazysizes';
window.lazySizesConfig.preloadClass = 'js-lazysizes-preload';
window.lazySizesConfig.loadedClass = 'js-lazysizes-loaded';

if (typeof global.document !== 'undefined') {
  // eslint-disable-next-line
  require('lazysizes');
}

type Props = {
  src: string,
  alt: string,
  width?: number,
  height?: number,
  preload?: boolean
}

const LazyloadImage = ({ src, alt, width, height, preload }: Props) => {
  const srcWithoutJPGExtension = src.replace(/\.jpe?g$/, '');
  const srcset = [
    `${srcWithoutJPGExtension}-800w.jpg 800w`,
    `${srcWithoutJPGExtension}-1200w.jpg 1200w`,
    `${srcWithoutJPGExtension}-2400w.jpg 2400w`,
  ].join(', ');

  return (
    <span>
      <img
        src="data:image/gif;base64,R0lGODlhAQABAPAAAPLy8v///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
        alt={alt}
        data-srcset={srcset}
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
};

LazyloadImage.defaultProps = {
  width: undefined,
  height: undefined,
  preload: false,
};

export default LazyloadImage;
