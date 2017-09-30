// @flow

import React from 'react';
import Arrow from 'components/icons/arrow';

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
      <a className="x xa-baseline h-fade c-white td-none" href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
        <span style={{ width: 120 }}>{name}</span>
        <span className="p-relative" style={{ top: 2, transform: 'rotate(-46deg)' }}><Arrow fill="white" width={14} /></span>
      </a>
    </div>
  </div>
);

export default CVPanel;
