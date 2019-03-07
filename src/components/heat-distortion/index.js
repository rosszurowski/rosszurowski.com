// @flow

import React from 'react';
import HeatDistortionCanvas from './component';
import withMediaQuery from './with-media-query';

const HeatDistortion = ({ isDesktop }) => (
  <div
    className="x-1 pe-none us-none p-absolute top-0 right-0 bottom-0 z-0"
    style={{ left: '30%' }}>
    {isDesktop ? <HeatDistortionCanvas /> : null}
  </div>
);

export default withMediaQuery({
  isDesktop: 'only screen and (min-width: 701px)',
})(HeatDistortion);
