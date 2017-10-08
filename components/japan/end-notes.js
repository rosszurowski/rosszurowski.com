// @flow

import React from 'react';
import type { Node } from 'react';

type Props = {
  children: Node,
};

const EndNotes = ({ children, ...props }: Props) => (
  <footer {...props}>
    {children}
    <style jsx>{`
      footer {
        color: #777;
        font-size: 0.6rem;
      }
    `}</style>
  </footer>
);

export default EndNotes;
