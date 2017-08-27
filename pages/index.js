// @flow

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Page from 'components/layouts/page';
import HeatDistortion from 'components/heat-distortion';
import CVPanel from 'components/cv-panel';

import F from 'components/styles/f';
import Reset from 'components/styles/reset';
import FontFaceCalibre from 'components/styles/font-face-calibre';

import ZigZag from 'components/icons/zig-zag';

const meta = {
  title: 'Ross Zurowski',
  description: 'Designer and developer from Toronto.',
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - (min + 1))) + min;

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
    <F />
    <Reset />
    <FontFaceCalibre />
    <main className="x xa-stretch">
      <div className="xx p-relative pa-4 pa-5-s z-1">
        <div className="lh-1d6" style={{ maxWidth: '23em' }}>
          <div className="mb-5 mb-6-s">
            <Link href="/">
              <a className="h-fade"><ZigZag fill="white" /></a>
            </Link>
          </div>
          <div className="mb-5 lh-1d2">
            <Link href="/"><a>Ross Zurowski</a></Link>
            <p className="mt-1 fs-18 o-75p">
              <a href="mailto:ross@rosszurowski.com" target="_blank" rel="noopener noreferrer">ross@rosszurowski.com</a>
              <span className="mh-2 p-relative" style={{ top: 4 }}>*</span>
              <a href="https://github.com/rosszurowski" target="_blank" rel="noopener noreferrer">Github</a>
              <span className="mh-2 p-relative" style={{ top: 4 }}>*</span>
              <a href="https://are.na/ross-zurowski" target="_blank" rel="noopener noreferrer">Are.na</a>
            </p>
          </div>
          <div className="mb-5">
            <p>Designer and engineer from Toronto.</p>
            <p className="mt-3">Working at <a href="https://watsi.org/" target="_blank" rel="noopener noreferrer">Watsi</a>, designing software for healthcare providers and low-income populations around the world.</p>
          </div>
          <div className="mb-4">
            <h4 className="mb-3" style={{ color: '#ffb7b3' }}>On-going Projects</h4>
            <p>
              {/* <Link href="/log"><a>Writing</a></Link>, */}
              {' '}
              <Link href="/100"><a>100 Days</a></Link>,
              {' '}
              <a href="https://twitter.com/smallseasonsbot">Small Seasons Bot</a>,
              {' '}
              <br />
              <a href="https://dogsofperu.tumblr.com">Dogs of Peru</a>,
              {' '}
              <a href="https://broken-idioms.tumblr.com">Broken Idioms</a>.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="mb-3" style={{ color: '#ffb7b3' }}>CV</h4>
            <CVPanel name="Watsi" href="https://watsi.org/" period="2016 – Present" />
            <CVPanel name="Format" href="https://format.com/themes/" period="2013 – 2016" />
            <CVPanel name="Palantir" href="https://palantir.com/" period="2015" />
            <CVPanel name="Facebook" href="http://facebook.design/" period="2014" />
          </div>
          <div className="mb-5">
            <h4 className="mb-3" style={{ color: '#ffb7b3' }}>Recent interests</h4>
            <p>Tools for writing and understanding (code, words, ideas), the future of the web, sunlight on concrete, keeping plants alive, dad jokes, rice noodles, making lists.</p>
          </div>
          <div className="fs-15 o-50p">
            <p>This website is published on the distributed web via <a href="https://datproject.org">Dat</a>. You can access it with <a href="https://beakerbrowser.com/">Beaker Browser</a>. Source code and past versions of this site are available on <a href="https://github.com/rosszurowski/rosszurowski.com">Github</a>.</p>
          </div>
        </div>
      </div>
      <div className="canvas xx d-none d-block-s p-absolute z-0" style={{ top: 0, right: 0, bottom: 0, width: '50vw' }}>
        <HeatDistortion
          html={`
            <div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: space-around; text-align: center;">
              <div style="background-color: #f79e98; width: 500px; height: 150px; transform: rotate(${randomInt(-90, -20)}deg)"></div>
              <div style="background-color: #f79e98; width: 210px; height: 50px; transform: rotate(${randomInt(-50, -20)}deg)"></div>
              <div style="background-color: #f79e98; width: 320px; height: 80px; transform: rotate(${randomInt(-90, 0)}deg)"></div>
              <div style="position: absolute; top: ${randomInt(30, 70)}%; left: ${randomInt(0, 70)}%; color: white; font-size: 120px; font-family: 'TiemposText-Regular', 'Times New Roman', Georgia, serif; transform: rotate(${randomInt(20, 60)}deg);">the internet is craaaazyyy</div>
            </div>
          `} />
      </div>
      <div className="d-none d-block-s pa-4 pa-5-s z-2">
        <aside className="x xj-spaceBetween pt-4 h-100p" style={{ writingMode: 'vertical-lr' }}>
          <div className="o-50p fs-15" style={{ letterSpacing: '1px' }}>{`43°58'13"N — 114°55'28"W`}</div>
          <div className="o-50p fs-15" style={{ marginLeft: 'auto' }}>Last updated August 26, 2017</div>
        </aside>
      </div>
    </main>
    <style jsx global>{`
      html,
      body {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        background: #131313;
      }

      html {
        color: #fafafa;
        font-family: Calibre, -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 22px;
        line-height: 1.25;
        letter-spacing: 0.05px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        position: relative;
      }

      main p a {
        color: inherit;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        padding-left: 1px;
        padding-right: 1px;
        text-decoration: none;
        transition: opacity 200ms ease;
      }

      main p a:hover {
        opacity: 0.8;
      }

      .h-fade {
        transition: opacity 200ms ease;
      }

      .h-fade:hover {
        opacity: 0.7;
      }

      .canvas {
        pointer-events: none;
        user-select: none;
      }
    `}</style>
  </Page>
);
