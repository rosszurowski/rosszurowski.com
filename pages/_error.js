// @flow

import React from 'react';
import Head from 'next/head';

import Page from 'components/layouts/page';
import FontFaceCalibre from 'components/styles/font-face-calibre';
import Reset from 'components/styles/reset';
import Utilities from 'components/styles/utilities';

const NOT_DEV = process.env.NODE_ENV !== 'development';

export default () => (
  <Page titleOverride="Redirecting...">
    <Head>
      {NOT_DEV && <meta httpEquiv="refresh" content={`0;url=https://rosszurowski.com/`} />}
    </Head>
    <Reset />
    <FontFaceCalibre />
    <Utilities />
    <div className="pa-4">
      <p className="ff-sans">Just a sec, redirecting you...</p>
    </div>
  </Page>
);
