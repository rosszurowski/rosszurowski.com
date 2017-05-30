import React from 'react';
import PropTypes from 'prop-types';
import LazyloadImage from 'components/lazyload-image';
import utils from 'lib/utils';

const getImageUrl = (srcId, size) => utils.getAssetUrl(`2017/japan/${srcId}-${size}w.jpg`);
const sizeToSrcSet = srcId => size => `${getImageUrl(srcId, size)} ${size}w`;

const Image = ({ srcId, sizes, ...rest }) => (
  <LazyloadImage srcSet={sizes.map(sizeToSrcSet(srcId))} {...rest} />
);

Image.propTypes = {
  srcId: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Image;
