import React from 'react';
import LazyloadImage from 'components/lazyload-image';

type Props = {
  src: string
};

const PostImage = ({ src, ...props }: Props) => {
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

export default PostImage;
