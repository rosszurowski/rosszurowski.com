// @flow

import React from 'react';
import markdown from 'markdown-in-js';
import PostLayout, { config } from 'components/layouts/post';

const content = markdown(config)`

![](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017-09-first-post/first-web-server.jpg)
<small>Source: [WikiMedia Foundation](#)</small>

`;

const post = {
  title: 'Decentralized Web',
  publishedAt: new Date(2017, 8, 7),
};

export default () => <PostLayout {...post}>{content}</PostLayout>;
