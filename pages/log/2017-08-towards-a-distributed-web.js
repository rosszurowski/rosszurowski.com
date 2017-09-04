// @flow

import React from 'react';
import PostLayout from 'components/layouts/post';

import post from './2017-08-towards-a-distributed-web.md';

const postMeta = {
  title: 'Towards a Distributed Web',
  publishedAt: new Date('2017-08-29T09:17:29.107-0800'),
};

export default () => (
  <PostLayout {...postMeta} content={post} />
);
