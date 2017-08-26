// @flow

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Page from 'components/layouts/page';
// import StarField from 'components/star-field';
import HeatDistortion from 'components/heat-distortion';
import FontFaceCalibre from 'components/styles/font-face-calibre';

const meta = {
  title: 'Ross Zurowski',
  description: 'Designer and developer from Toronto.',
};

export default () => (
  <Page>
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="og:title" content={meta.title} />

      <meta name="og:description" content={meta.description} />
      <meta name="og:image" content="/static/og-image.png" />
      <meta name="og:url" content="https://rosszurowski.com" />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content="Ross Zurowski" />

      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="/static/og-image.png" />
      <meta name="twitter:creator" content="@rosszurowski" />
      <meta name="twitter:url" content="https://rosszurowski.com" />
    </Head>
    <FontFaceCalibre />
    <HeatDistortion>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Calibre, sans-serif', lineHeight: 1.2, color: 'white', textAlign: 'center', height: '100vh' }}>
        <h1 style={{ fontSize: 96, fontWeight: 400, margin: 0 }}>Whoa!</h1>
        <h2 style={{ fontSize: 48, fontWeight: 400, margin: 0 }}>The internet is a crazy place.</h2>
      </div>
    </HeatDistortion>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
      }

      html {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        box-sizing: border-box;
        background: #202228;
        /*color: rgba(255, 255, 255, 0.8);
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 20px;
        font-weight: 300;
        line-height: 1.3;
        letter-spacing: 0.02em;*/
      }

      .canvas {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 1.0;
        will-change: opacity;
        pointer-events: none;
        transition: opacity 4000ms ease;
      }
    `}</style>
  </Page>
);
