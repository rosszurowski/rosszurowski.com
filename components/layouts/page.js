import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

function getPageTitle (title, titleOverride) {
  if (titleOverride) {
    return titleOverride;
  }

  return title ? `${title} — Ross Zurowski` : 'Ross Zurowski';
}

const Page = ({ title, titleOverride, description, imagePreviewUrl, children }) => (
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

      <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
    </Head>
    {children}
  </div>
);

Page.propTypes = {
  title: PropTypes.string,
  titleOverride: PropTypes.string,
  description: PropTypes.string,
  imagePreviewUrl: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Page.defaultProps = {
  title: undefined,
  titleOverride: undefined,
  description: 'Designer and developer from Toronto.',
  imagePreviewUrl: '/static/og-image.png',
};

export default Page;
