import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

const meta = {
  title: 'Ross Zurowski',
  description: 'Designer and developer from Toronto.',
};

export default class CustomDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render () {
    return (
      <html lang="en">
        <Head>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />

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
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
