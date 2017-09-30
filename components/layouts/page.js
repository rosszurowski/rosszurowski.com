// @flow

import React, { type Node } from 'react';
import Head from 'next/head';

const isEmpty = (v: ?any): boolean => v === undefined || v === null;
const not = (v: any): boolean => !v;

function getPageTitle (title: ?string, titleOverride: ?string) {
  if (!isEmpty(titleOverride)) {
    return titleOverride;
  }

  return [title, `Ross Zurowski`]
    .filter(v => not(isEmpty(v)))
    .join(` – `);
}

type Props = {
  title?: string,
  titleOverride?: string,
  description?: string,
  imagePreviewUrl?: string,
  children: Node,
};

const PageLayout = ({ title, titleOverride, description, imagePreviewUrl, children }: Props) => (
  <div>
    <Head>
      <title>{getPageTitle(title, titleOverride)}</title>

      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imagePreviewUrl} />
      <meta property="og:site_name" content="Ross Zurowski" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={imagePreviewUrl} />
      <meta name="twitter:creator" content="@rosszurowski" />

      <link rel="icon" href="/static/favicon.png?201708261612" type="image/png" />
      <link rel="stylesheet" href="/static/css/index.css" type="text/css" />
    </Head>
    {children}
    <script dangerouslySetInnerHTML={{ __html: `
var _gauges = _gauges || [];
(function() {
  var t   = document.createElement('script');
  t.type  = 'text/javascript';
  t.async = true;
  t.id    = 'gauges-tracker';
  t.setAttribute('data-site-id', '59cfd9284b9eb755df0097f6');
  t.setAttribute('data-track-path', 'https://track.gaug.es/track.gif');
  t.src = 'https://d36ee2fcip1434.cloudfront.net/track.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(t, s);
})();
    ` }} />
  </div>
);

PageLayout.defaultProps = {
  title: undefined,
  titleOverride: undefined,
  description: 'Designer and developer from Toronto.',
  imagePreviewUrl: '/static/og-image.png',
};

export default PageLayout;
