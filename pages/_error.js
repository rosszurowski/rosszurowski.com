// @flow

import React from 'react';
import Head from 'next/head';

import Page from 'components/layouts/page';
import FontFaceCalibre from 'components/styles/font-face-calibre';

const NOT_DEV = process.env.NODE_ENV !== 'development';

export default () => (
  <Page titleOverride="Redirecting...">
    <Head>
      {NOT_DEV && <meta httpEquiv="refresh" content={`0;url=https://rosszurowski.com/`} />}
    </Head>
    <FontFaceCalibre />
    <p>Just a sec, redirecting you...</p>
    <style jsx>{`
      p {
        font-family: Calibre, sans-serif;
        padding: 24px;
      }
    `}</style>
  </Page>
);
