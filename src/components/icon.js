// @flow

import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const icons = {
  zigzag: props => (
    <svg viewBox="0 0 34 10" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.739 0L7.253 6.34 1.538.753 0 2.326l7.253 7.088 6.486-6.336 6.486 6.336 6.496-6.338 5.731 5.588 1.536-1.573L26.72.003l-6.496 6.336z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  ),
  ded: props => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor" fill-rule="evenodd">
        <path d="m1.5 1.5h7.5v1.5h-7.5z" />
        <path d="m4.5 9h1.5v1.5h-1.5z" />
        <path d="m7.5 9h1.5v1.5h-1.5z" />
        <path d="m6 10.5h1.5v1.5h-1.5z" />
        <path d="m4.5 12h1.5v1.5h-1.5z" />
        <path d="m7.5 12h1.5v1.5h-1.5z" />
        <path d="m15 12h1.5v1.5h-1.5z" />
        <path d="m16.5 10.5h1.5v1.5h-1.5z" />
        <path d="m18 12h1.5v1.5h-1.5z" />
        <path d="m18 9h1.5v1.5h-1.5z" />
        <path d="m15 9h1.5v1.5h-1.5z" />
        <path d="m16.5 3h1.5v1.5h-1.5z" />
        <path d="m4.5 16.5h1.5v1.5h-1.5z" />
        <path d="m6 16.5h1.5v1.5h-1.5z" />
        <path d="m7.5 15h1.5v1.5h-1.5z" />
        <path d="m9 15h1.5v1.5h-1.5z" />
        <path d="m10.5 15h1.5v1.5h-1.5z" />
        <path d="m12 15h1.5v1.5h-1.5z" />
        <path d="m13.5 16.5h1.5v1.5h-1.5z" />
        <path d="m15 16.5h1.5v1.5h-1.5z" />
        <path d="m16.5 18h1.5v1.5h-1.5z" />
        <path d="m18 18h1.5v1.5h-1.5z" />
        <path d="m0 3h1.5v19.5h-1.5z" />
        <path d="m1.5 21h21v1.5h-21z" />
        <path d="m22.5 6h1.5v16.5h-1.5z" />
        <path d="m9 3h1.5v3h-1.5z" />
        <path d="m10.5 4.5h12v1.5h-12z" />
        <path d="m10.5 1.5h6v1.5h-6z" />
      </g>
    </svg>
  ),
  arrow: props => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M.216 11.359v2.819h18.401L10.24 22.87l2.114 1.918 11.276-11.941L12.314.788l-2.153 1.88 8.339 8.691z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  ),
};

type Props = {
  name: $Keys<typeof icons>,
  size: number | string,
  iconSize: number | string,
};

const IconContainer = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

export default class Icon extends PureComponent<Props> {
  static defaultProps = {
    size: 24,
    iconSize: 24,
  };

  render() {
    const { name, iconSize, size } = this.props;
    const { [name]: Icon } = icons;

    return (
      <IconContainer size={size}>
        <Icon width={iconSize} height={iconSize} />
      </IconContainer>
    );
  }
}
