import React from 'react';
import Head from 'next/head';

import Header from 'components/100/header';
import PostList from 'components/100/post-list';
import FontFaceCalibre from 'components/styles/font-face-calibre';

import { color } from 'lib/100/styles';

import posts from 'data/100/posts.json';

const title = '100 Days';
const description = 'A photography project by designer Ross Zurowski. 100 days of photos.';

export default () => {
  const orderedPosts = posts.slice().reverse();

  return (
    <main>
      <Head>
        <title>{title} &mdash; Ross Zurowski</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://rosszurowski.com/100" />
      </Head>

      <Header />
      <div>
        <PostList posts={orderedPosts} />
      </div>
      <FontFaceCalibre />
      <style jsx global>{`
        * {
          margin: 0;
          box-sizing: border-box;
        }

        body {
          color: ${color.black};
          font-family: 'Calibre', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        img,
        svg,
        video {
          max-height: 100%;
          max-width: 100%;
          height: auto;
          width: auto;
          vertical-align: top;
        }

        a {
          color: inherit;
          text-decoration: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.0);
        }

        h1, h2, h3, h4, h5, h6 {
          font-weight: normal;
          text-rendering: optimizeLegibility;
        }
      `}</style>
    </main>
  );
};
