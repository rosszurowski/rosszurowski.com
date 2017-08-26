import React from 'react';

type Props = {
  fill: string,
  width: number,
};

const baseWidth = 34;
const baseHeight = 10;

const ratio = baseHeight / baseWidth;

const ZigZag = ({ fill, width }: Props) => (
  <svg width={width} height={width * ratio} viewBox={`0 0 ${baseWidth} ${baseHeight}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M13.739 0L7.253 6.34 1.538.753 0 2.326l7.253 7.088 6.486-6.336 6.486 6.336 6.496-6.338 5.731 5.588 1.536-1.573L26.72.003l-6.496 6.336z" fill={fill} fillRule="evenodd" />
  </svg>
);

ZigZag.defaultProps = {
  fill: 'white',
  width: baseWidth,
};

export default ZigZag;
