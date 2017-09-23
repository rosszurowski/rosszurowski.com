// @flow

import React from 'react';
import Page from 'components/layouts/page';
import Header from 'components/100/header';
import PostList from 'components/100/post-list';

import posts from 'content/100.json';

const title = '100 Days';
const description = 'A photography project by designer Ross Zurowski. 100 days of photos.';

export default () => {
  const orderedPosts = posts.slice().reverse();

  return (
    <Page title={title} description={description}>
      <Header />
      <div>
        <PostList posts={orderedPosts} />
      </div>
      <style jsx global>{`
        body {
          color: #141414;
          font-family: Calibre, -apple-system, BlinkMacSystemFont, sans-serif;
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

        .notice-wrapper {
          margin-left: auto;
          margin-right: auto;
          max-width: 40rem;
          width: 90%;
        }

        .notice {
          background-color: rgba(0, 191, 131, 0.1);
          color: #00bf83;
          padding: 36px;
          font-size: 19px;
          text-align: center;
        }
      `}</style>
    </Page>
  );
};
