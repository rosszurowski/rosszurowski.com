// @flow

import React from 'react';
import Page from 'components/layouts/page';
import Header from 'components/100/header';
import PostList from 'components/100/post-list';
import FontFaceCalibre from 'components/styles/font-face-calibre';

import { color } from 'lib/100/styles';

import posts from 'data/100.json';

const title = '100 Days';
const description = 'A photography project by designer Ross Zurowski. 100 days of photos.';

export default () => {
  const orderedPosts = posts.slice().reverse();

  return (
    <Page title={title} description={description}>
      <Header />
      <div className="notice-wrapper">
        <div className="notice">
          This project technically ended on Aug 9th, but I still have a few more photos to post. I’ll be adding them in the coming few days. 🙈
        </div>
      </div>
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

        .notice-wrapper {
          margin-left: auto;
          margin-right: auto;
          max-width: 40rem;
          width: 90%;
        }

        .notice {
          background-color: rgba(0, 191, 131, 0.1);
          color: ${color.green};
          padding: 36px;
          font-size: 19px;
          text-align: center;
        }
      `}</style>
    </Page>
  );
};
