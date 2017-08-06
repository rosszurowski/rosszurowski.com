// @flow

import React from 'react';
import type { Children } from 'react';

type Props = {
  children: Children,
  external?: boolean,
  href: string,
}

const Link = ({ children, external, ...props }: Props) => (
  <a target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} {...props}>
    {children}
    <style jsx>{`
      a {
        color: #fc3a57;
        border-bottom: 2px transparent solid;
        text-decoration: none;
      }

      a:hover {
        border-bottom-color: rgba(252, 58, 87, 0.8);
      }
    `}</style>
  </a>
);

Link.defaultProps = {
  external: false,
};

export default Link;
