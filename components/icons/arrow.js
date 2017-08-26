import React from 'react';

type Props = {
  fill: string,
  width: number,
};

const baseWidth = 24;
const baseHeight = 25;

const ratio = baseHeight / baseWidth;

const ZigZag = ({ fill, width }: Props) => (
  <svg width={width} height={width * ratio} viewBox={`0 0 ${baseWidth} ${baseHeight}`} xmlns="http://www.w3.org/2000/svg">
    <path fill={fill} d="M.216 11.359v2.819h18.401L10.24 22.87l2.114 1.918 11.276-11.941L12.314.788l-2.153 1.88 8.339 8.691z" fillRule="evenodd" />
  </svg>
);

ZigZag.defaultProps = {
  fill: 'white',
  width: baseWidth,
};

export default ZigZag;
