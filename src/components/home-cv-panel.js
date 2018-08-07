// @flow

import React from 'react';
import Icon from '../components/icon';

type Props = {
  name: string,
  period: string,
  href: string,
};

const CVPanel = ({ name, href, period }: Props) => (
  <div className="x">
    <div className="mr-4" style={{ width: 140 }}>
      {period}
    </div>
    <div>
      <a
        className="x xa-baseline h-fade c-white td-none"
        href={href}
        target="_blank"
        rel="noopener noreferrer">
        <span style={{ width: 120 }}>{name}</span>
        <span
          className="p-relative"
          style={{ top: 1, transform: 'rotate(-46deg)' }}>
          <Icon name="arrow" size={14} iconSize={14} />
        </span>
      </a>
    </div>
  </div>
);

export default CVPanel;
