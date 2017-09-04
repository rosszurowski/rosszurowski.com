import React from 'react';

export default () => (
  <style jsx global>{`
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      font-weight: normal;
      text-rendering: optimizeLegibility;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    p, ul, ol, blockquote {
      margin: 0;
      padding: 0;
    }

    img,
    svg,
    canvas,
    video {
      max-width: 100%;
      height: auto;
    }
  `}</style>
);
