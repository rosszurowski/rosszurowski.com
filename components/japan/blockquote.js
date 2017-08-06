// @flow

import React from 'react';
import type { Children } from 'react';

type Props = {
  children: Children,
};

const Blockquote = ({ children }: Props) => (
  <blockquote className="pl3">
    {children}
    <style jsx>{`
      blockquote {
        color: #666;
        font-size: 0.8rem;
        line-height: 1.5;
        border-left: 4px #f2f2f2 solid;
      }
    `}</style>
  </blockquote>
);

export default Blockquote;
