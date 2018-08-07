// @flow

import React from 'react';
import HeatDistortionCanvas from './component';
import withMediaQuery from './with-media-query';

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - (min + 1))) + min;

const html = `
<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: space-around; text-align: center;">
  <div style="background-color: #f79e98; width: 500px; height: 150px; transform: rotate(${randomInt(
    -90,
    -20,
  )}deg)"></div>
  <div style="background-color: #f79e98; width: 210px; height: 200px; transform: rotate(${randomInt(
    -50,
    -20,
  )}deg)"></div>
  <div style="background-color: #f79e98; width: 320px; height: 80px; transform: rotate(${randomInt(
    -90,
    90,
  )}deg)"></div>
</div>
`;

const HeatDistortion = ({ isDesktop }) => (
  <div
    className="x-1 pe-none us-none p-absolute top-0 right-0 bottom-0 z-0"
    style={{ left: '30%' }}>
    {isDesktop ? <HeatDistortionCanvas html={html} /> : null}
  </div>
);

export default withMediaQuery({
  isDesktop: 'only screen and (min-width: 701px)',
})(HeatDistortion);
