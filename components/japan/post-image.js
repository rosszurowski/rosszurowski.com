// @flow

import React from 'react';
import Image from 'components/japan/image';

type Props = {
  srcId: string,
  sizes?: Array<number>,
  alt: string,
  width?: number,
  height?: number,
};

const PostImage = ({ srcId, sizes, alt, width, height, ...rest }: Props) => (
  <figure {...rest}>
    {/* $FlowFixMe: default props issues */}
    <Image srcId={srcId} sizes={sizes} alt={alt} width={width} height={height} />
  </figure>
);

PostImage.defaultProps = {
  sizes: [2400, 1200, 800],
  width: 1200,
  height: 800,
};

export default PostImage;
