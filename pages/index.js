// @flow

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import PageLayout from 'components/layouts/page';
import CVPanel from 'components/homepage-cv-panel';
import HeatDistortion from 'components/homepage-heat-distortion';

import ZigZag from 'components/icons/zig-zag';

export default () => (
  <PageLayout>
    <main className="ff-sans fs-18 lh-1d7 x-s xa-stretch">
      <div className="x-1 x-auto p-relative pa-3 pa-5-s z-1">
        <div className="mw-540">
          <div className="mb-5 mb-6-s">
            <Link href="/">
              <a className="h-fade">
                <ZigZag fill="white" />
              </a>
            </Link>
          </div>
          <div className="mb-5 lh-1d2">
            <Link href="/">
              <a>Ross Zurowski</a>
            </Link>
            <p className="x xd-column xd-row-s xa-start mt-1 fs-15 o-75p">
              <a href="mailto:ross@rosszurowski.com" target="_blank" rel="noopener noreferrer">
                ross@rosszurowski.com
              </a>
              <span className="d-none d-inlineBlock-s fs-13 mh-2 p-relative" style={{ top: 1 }}>
                •
              </span>
              <a className="mt-1 mt-0-s" href="https://github.com/rosszurowski" target="_blank" rel="noopener noreferrer">
                Github
              </a>
              <span className="d-none d-inlineBlock-s fs-13 mh-2 p-relative" style={{ top: 1 }}>
                •
              </span>
              <a className="mt-1 mt-0-s" href="https://are.na/ross-zurowski" target="_blank" rel="noopener noreferrer">
                Are.na
              </a>
            </p>
          </div>
          <div className="mb-5">
            <p>Designer and developer from Toronto.</p>
            <p className="mt-3">
              Working at{' '}
              <a href="https://watsi.org/" target="_blank" rel="noopener noreferrer">
                Watsi
              </a>, designing healthcare software to benefit low-income populations around the world.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="mb-3 c-pink">CV</h4>
            <CVPanel name="Watsi" href="https://watsi.org/" period="2016 – Present" />
            <CVPanel name="Format" href="https://format.com/themes/" period="2013 – 2016" />
            <CVPanel name="Palantir" href="https://palantir.com/" period="2015" />
            <CVPanel name="Facebook" href="http://facebook.design/" period="2014" />
          </div>
          <div className="mb-4">
            <h4 className="mb-3 c-pink">Recent projects</h4>
            <p>
              <Link href="/100">
                <a>100 Days</a>
              </Link>, <a href="https://broken-idioms.com">Broken Idioms</a>.
            </p>
          </div>
          <div className="mb-5">
            <h4 className="mb-3 c-pink">Recent interests</h4>
            <p>
              Rice noodles,{' '}
              <a href="https://smallseasons.guide" target="_blank" rel="noopener noreferrer">
                alternate calendars
              </a>,{' '}
              <a href="https://www.are.na/ross-zurowski/language-thought" target="_blank" rel="noopener noreferrer">
                language and thought
              </a>,{' '}
              <Link href="/log/2017/toward-a-distributed-web">
                <a>the future of the web</a>
              </Link>, and making ice cream.
            </p>
          </div>
          <div className="fs-13 o-50p">
            <p>
              This website is published on the distributed web via <a href="https://datproject.org">Dat</a>. You can access it with <a href="https://beakerbrowser.com/">Beaker Browser</a>. Source code
              and past versions of this site are available on <a href="https://github.com/rosszurowski/rosszurowski.com">Github</a>.
            </p>
          </div>
        </div>
      </div>
      <div className="d-none d-block-s pa-4 pa-5-s z-2 moz-hideBlock-s" style={{ writingMode: 'vertical-lr' }}>
        <aside className="x xj-spaceBetween pt-4 h-100p o-50p fs-13">
          <div className="ls-1">{`43°58'13"N — 114°55'28"W`}</div>
          <div className="ml-auto">Last updated August 26, 2017</div>
        </aside>
      </div>
      <HeatDistortion />
    </main>
    <style jsx global>{`
      html,
      body {
        background: #131313;
        color: #fafafa;
        letter-spacing: 0.05px;
      }

      body {
        position: relative;
      }

      ::selection {
        background: rgba(255, 182, 182, 0.3);
      }

      main p a {
        color: inherit;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        text-decoration: none;
        transition: opacity 200ms ease;
      }

      main p a:hover {
        opacity: 0.8;
      }

      /* Firefox doesn't support writing-mode with flexbox, so lets disable this for now */
      @media only screen and (min-width: 479px) {
        .moz-hideBlock-s {
          display: none;
        }
        .moz-hideBlock-s:not(*:root) {
          display: block;
        }
      }
    `}</style>
  </PageLayout>
);
