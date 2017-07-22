import React from 'react';
import PropTypes from 'prop-types';

import LazyloadImage from 'components/lazyload-image';

const PostImage = ({ src, ...props }) => {
  const srcWithoutJPGExtension = src.replace(/\.jpe?g$/, '');
  const srcSet = [
    `${srcWithoutJPGExtension}-1200w.jpg?20170721 1200w`,
    `${srcWithoutJPGExtension}-2400w.jpg?20170721 2400w`,
    `${srcWithoutJPGExtension}-800w.jpg?20170721 800w`,
  ];

  return (
    <span>
      <LazyloadImage srcSet={srcSet} {...props} />
      <style jsx>{`
        span {
          display: inline-block;
        }

        span :global(canvas) {
          height: auto;
          width: auto;
          max-height: 92vh;
          max-width: 100%;
          vertical-align: top;
        }
      `}</style>
    </span>
  );
};

PostImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default PostImage;
