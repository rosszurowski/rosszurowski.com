// @flow

import React, { type Node } from 'react';

type Props = {
  children: Node,
};

export default ({ children }: Props) => (
  <blockquote className="pv-1 pl-3 mv-3">
    {children}
    <style jsx>{`
      blockquote {
        border-left: 2px #ccc solid;
      }
    `}</style>
  </blockquote>
);
