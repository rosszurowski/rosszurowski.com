import Document, { Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

import 'object.assign/polyfill';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
