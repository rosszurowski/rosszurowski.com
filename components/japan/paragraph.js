// @flow

import React from 'react';
import type { Node } from 'react';

type Props = {
  children: Node
};

const Paragraph = ({ children }: Props) => (
  <div>
    <p>{children}</p>
  </div>
);

export default Paragraph;
