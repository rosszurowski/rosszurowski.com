// @flow

import React from 'react';

import { color, font, spacing } from 'lib/100/styles';

const underline = `data:image/svg+xml;utf8,<svg width="255" height="25" viewBox="0 0 255 25" xmlns="http://www.w3.org/2000/svg"><path d="M4 4c19.5 1 39.333 8.456 57.5 11.5 18.167 3.044 49.865 6.511 65.5 5.5 22.585-1.46 39.215-9.186 63-9 21.855.17 39.746 1.233 61.472 2.788" stroke="${color.green}" stroke-width="7" fill="none" fill-rule="evenodd" stroke-linecap="round"/></svg>`;

export default () => (
  <header>
    <div className="parts">
      <div>
        <h4>May 1</h4>
      </div>
      <div className="title">
        <h1>100</h1>
      </div>
      <div>
        <h4>Aug 9</h4>
      </div>
    </div>
    <style jsx>{`
      header {
        max-width: 900px;
        margin: 10vh auto;
        padding: 0 10%;
        text-align: center;
      }

      .parts {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .title {
        position: relative;
        top: 16px;
        margin-bottom: ${spacing[4]};
        cursor: default;
        user-select: none;
      }

      h1 {
        display: inline-block;
        color: ${color.green};
        font-size: ${font.size[6]};
        font-weight: ${font.weight.light};
        background-image: url('${underline}');
        background-repeat: no-repeat;
        background-position: center bottom;
        background-size: 100%;
        padding: 0 ${spacing[3]} ${spacing[1]};
      }

      h4 {
        color: ${color.gray};
        font-size: ${font.size[1]};
      }
    `}</style>
  </header>
);
