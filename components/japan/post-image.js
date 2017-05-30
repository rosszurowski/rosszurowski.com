import React from 'react';
import PropTypes from 'prop-types';

import Image from 'components/japan/image';

const noop = () => undefined;

const PostImage = ({ srcId, sizes, alt, width, height, onClick, ...rest }) => (
  <figure {...rest}>
    <Image srcId={srcId} sizes={sizes} alt={alt} width={width} height={height} />
  </figure>
);

PostImage.propTypes = {
  srcId: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
};

PostImage.defaultProps = {
  sizes: [2400, 1200, 800],
  width: 1200,
  height: 800,
  onClick: noop,
};

export default PostImage;
