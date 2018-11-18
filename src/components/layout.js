// @flow

import React, { Fragment } from 'react';
import Head from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { cx } from 'react-emotion';
import favicon from '../assets/favicon.png';

import '@rosszurowski/vanilla/lib/vanilla.css';
import '../assets/css/base.css';
import '../assets/css/utilities.css';

type Props = {
  children: React$Node,
  dark?: boolean,
  data: {
    site: {
      siteMetadata: { title: string, titleTemplate: string, url: string },
    },
  },
};

const Layout = ({ children, data, dark }: Props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            titleTemplate
            url
          }
        }
      }
    `}
    render={data => {
      const { site } = data;
      const { siteMetadata: metadata } = site;

      return (
        <Fragment>
          <Head
            defaultTitle={metadata.title}
            titleTemplate={metadata.titleTemplate}>
            <body className={cx({ 'c-white bgc-black dark': dark })} />
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
            />
            <meta name="description" content={metadata.description} />
            <link rel="shortcut icon" href={favicon} />

            <meta property="og:type" content="website" />
            <meta property="og:image" content="/img/social.png" />
            <meta property="og:site_name" content={metadata.title} />

            <meta name="twitter:description" content={metadata.description} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content="/img/social.png" />
            <meta name="twitter:creator" content="@rosszurowski" />
          </Head>
          <main>{children}</main>
        </Fragment>
      );
    }}
  />
);

export default Layout;
