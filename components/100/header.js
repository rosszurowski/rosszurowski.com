// @flow

import React from 'react';

const underline = `data:image/svg+xml;utf8,<svg width="255" height="25" viewBox="0 0 255 25" xmlns="http://www.w3.org/2000/svg"><path d="M4 4c19.5 1 39.333 8.456 57.5 11.5 18.167 3.044 49.865 6.511 65.5 5.5 22.585-1.46 39.215-9.186 63-9 21.855.17 39.746 1.233 61.472 2.788" stroke="#00bf83" stroke-width="7" fill="none" fill-rule="evenodd" stroke-linecap="round"/></svg>`;

export default () => (
  <header className="ta-center">
    <div className="x xa-center xj-spaceBetween">
      <div>
        <h4 className="fs-13 o-50p">May 1</h4>
      </div>
      <div className="title mb-4">
        <h1 className="fs-72 ph-3 pb-1">100</h1>
      </div>
      <div>
        <h4 className="fs-13 o-50p">Aug 9</h4>
      </div>
    </div>
    <style jsx>{`
      header {
        max-width: 900px;
        margin: 10vh auto;
        padding: 0 10%;
      }

      .title {
        position: relative;
        top: 16px;
        cursor: default;
        user-select: none;
      }

      h1 {
        display: inline-block;
        color: #00bf83;
        font-weight: 300;
        background-image: url('${underline}');
        background-repeat: no-repeat;
        background-position: center bottom;
        background-size: 100%;
      }
    `}</style>
  </header>
);
