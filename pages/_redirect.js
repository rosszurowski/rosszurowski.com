// @flow

import React, { Component } from 'react';
import Head from 'next/head';
import PageLayout from 'components/layouts/page';

const IS_PRODUCTION = process.env.NODE_ENV !== 'development';

type Props = {
  redirectPath: string,
};

export default class Redirect extends Component<Props> {
  static async getInitialProps(ctx) {
    const redirectPath = ctx.query.path || '/';
    return { redirectPath };
  }

  render() {
    return (
      <PageLayout titleOverride="Redirecting...">
        <Head>{IS_PRODUCTION && <meta httpEquiv="refresh" content={`0;url=${this.props.redirectPath}`} />}</Head>
        <div className="ff-sans pa-4">
          {IS_PRODUCTION ? (
            <p>Just a sec, redirecting you...</p>
          ) : (
            <div>
              <p>Redirect page disabled in dev.</p>
              <p className="mt-3 h-fade">
                <a href={this.props.redirectPath}>Go here &rarr;</a>
              </p>
            </div>
          )}
        </div>
      </PageLayout>
    );
  }
}
