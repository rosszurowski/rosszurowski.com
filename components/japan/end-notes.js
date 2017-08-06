// @flow

import React from 'react';
import type { Children } from 'react';

type Props = {
  children: Children
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
