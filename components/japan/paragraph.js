// @flow

import React from 'react';
import type { Children } from 'react';

type Props = {
  children: Children
};

const Paragraph = ({ children }: Props) => (
  <div>
    <p>{children}</p>
  </div>
);

export default Paragraph;
