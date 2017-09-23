// @flow

import React, { Component } from 'react';
import Head from 'next/head';
import Page from 'components/layouts/page';

const IS_PRODUCTION = process.env.NODE_ENV !== 'development';

type Props = {
  redirectPath: string,
};

export default class Redirect extends Component<Props> {
  props: Props

  static async getInitialProps (ctx) {
    const redirectPath = ctx.query.path || '/';
    return { redirectPath };
  }

  render () {
    return (
      <Page titleOverride="Redirecting...">
        <Head>
          {IS_PRODUCTION && <meta httpEquiv="refresh" content={`0;url=${this.props.redirectPath}`} />}
        </Head>
        <div className="pa-4">
          <p className="ff-sans">Just a sec, redirecting you...</p>
          {!IS_PRODUCTION && <p>No redirects in dev. <a href={this.props.redirectPath}>Go here</a></p>}
        </div>
      </Page>
    );
  }
}
