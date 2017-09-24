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
      `}</style>
    </Page>
  );
};
