import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Page from 'components/layouts/page';
import StarField from 'components/star-field';
import FontFaceCalibre from 'components/styles/font-face-calibre';

const isClient = typeof document !== 'undefined';
const isMobile = isClient && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const meta = {
  title: 'Ross Zurowski',
  description: 'Designer and developer from Toronto.',
};

export default () => (
  <Page>
    <main>
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
      <section className="location">
        <a className="place" href="https://goo.gl/maps/u2NABtgJYn92" target="_blank" rel="noopener noreferrer">
          <div className="place-latitude">43°58'13"N</div>
          <div className="place-longitude">114°55'28"W</div>
        </a>
      </section>
      <section className="profile">
        <a href="/" className="profile-name">Ross Zurowski</a>
      </section>
      <section className="biography">
        <p>Designer and developer from Toronto.</p>
        <p>Making things at <a href="https://watsi.org" target="_blank" rel="noopener noreferrer">Watsi</a>. Previously interned with <a href="http://format.com" target="_blank" rel="noopener noreferrer">Format</a>, <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>, and <a href="http://palantir.com" target="_blank" rel="noopener noreferrer">Palantir</a>.</p>
        <p>Interested in design and systems thinking applied to human problems.</p>
      </section>
      <section className="contact">
        <p><a href="mailto:ross@rosszurowski.com">ross@rosszurowski.com</a></p>
      </section>
      <section className="elsewhere">
        <span className="elsewhere-label">Elsewhere</span>
        <ul className="elsewhere-links">
          <li className="elsewhere-link"><a href="https://github.com/rosszurowski">Github</a></li>
          <li className="elsewhere-link"><a href="https://rosszurowski.tumblr.com">Tumblr</a></li>
          <li className="elsewhere-link"><Link href="/100"><a>100 Days</a></Link></li>
        </ul>
      </section>
    </main>
    {!isMobile && (
      <div className="canvas">
        <StarField />
      </div>
    )}
    <section className="caption">
      <span>Full site coming soon...</span>
      <span>Updated Nov 2015</span>
    </section>
    <FontFaceCalibre />
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
        background: #2a303b;
        color: #cbced1;
        font-family: Calibre, sans-serif;
        font-size: 24px;
        font-weight: 200;
        line-height: 1.3;
        letter-spacing: 0.02em;
      }

      body {
        padding: 50px 60px;
        text-rendering: optimizeLegibility;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      p {
        margin: 0;
      }

      p + p {
        margin-top: 1em;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      main {
        max-width: 18rem;
        width: 90%;
        z-index: 2;
      }

      .location {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4rem;
        margin-bottom: 13vh;
      }

      .place {
        font-size: 13px;
        line-height: 1.2;
        letter-spacing: 1px;
        opacity: 0.5;
      }

      .place-latitude,
      .place-longitude {
        display: block;
      }

      .profile {
        margin-bottom: 2rem;
        margin-bottom: 12vh;
      }

      .profile-name {
        margin-right: 0.5rem;
        color: #fff;
      }

      .profile-role {
        opacity: 0.5;
        font-size: 16px;
        letter-spacing: 1px;
      }

      .profile-dash {
        display: inline-block;
        width: 50px;
        height: 3px;
        background: #7c8082;
        vertical-align: middle;
        margin: 0 0.4em;
        opacity: 0.5;
      }

      .biography {
        margin-bottom: 8vh;
      }

      .biography a {
        color: #fff6a8;
      }

      .biography a:hover,
      .contact a:hover,
      .elsewhere a:hover {
        border-bottom: 2px currentColor solid;
      }

      .contact {
        margin-bottom: auto;
      }

      .elsewhere {
        display: flex;
        font-size: 16px;
        margin-top: 6rem;
      }

      .elsewhere-links {
        display: flex;
      }

      .elsewhere-label {
        opacity: 0.5;
        margin-right: 1.5em;
      }

      .elsewhere-link {
        margin-right: 0.75em;
      }

      .caption {
        position: fixed;
        display: flex;
        justify-content: space-between;
        transform: translateX(50%) rotate(-90deg);
        transform-origin: top center;
        right: 60px;
        top: 50%;
        width: 100vh;
        padding: 0 50px;
        font-size: 12px;
        opacity: 0.5;
        z-index: 2;
      }

      .canvas {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        opacity: 1.0;
        will-change: opacity;
        pointer-events: none;
        transition: opacity 4000ms ease;
      }

      .circle {
        position: absolute;
        top: 50%;
        left: 67.5%;
        background: #464d58;
        border-radius: 50%;
        display: none;
        width: 14px; height: 14px;
        transform: translate(-50%, -50%);
        animation: blink 150ms linear infinite;
        transition: opacity 200ms ease;
      }

      @media (max-height: 660px) {
        .location { margin-bottom: 11vh; }
        .contact { margin-bottom: 3rem; }
      }

      @media (max-width: 620px) {
        body {
          padding: 30px 20px;
        }

        .circle,
        .canvas,
        .caption {
          display: none;
        }

        .profile,
        .biography {
          margin-bottom: 2rem;
        }
      }
    `}</style>
  </Page>
);
