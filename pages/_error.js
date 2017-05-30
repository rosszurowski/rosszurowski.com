import React from 'react';
import Head from 'next/head';

import FontFaceCalibre from 'components/styles/font-face-calibre';

export default () => (
  <div>
    <Head>
      <meta httpEquiv="refresh" content="0;url=https://rosszurowski.com" />
    </Head>
    <FontFaceCalibre />
    <p>Just a sec, redirecting you...</p>
    <style jsx>{`
      p {
        font-family: Calibre, sans-serif;
        padding: 24px;
      }
    `}</style>
  </div>
);
