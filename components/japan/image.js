// @flow

import React from 'react';
import LazyloadImage from 'components/lazyload-image';
import utils from 'lib/utils';

const getImageUrl = (srcId, size) => utils.getAssetUrl(`2017/japan/${srcId}-${size}w.jpg`);
const sizeToSrcSet = srcId => size => `${getImageUrl(srcId, size)} ${size}w`;

type Props = {
  srcId: string,
  sizes: Array<number>,
};

const Image = ({ srcId, sizes, ...rest }: Props) => <LazyloadImage srcSet={sizes.map(sizeToSrcSet(srcId))} {...rest} />;

export default Image;
