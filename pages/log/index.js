// @flow

import React from 'react';
import Link from 'next/link';
import PageLayout from 'components/layouts/page';
import utils from 'lib/utils';

type Post = {
  publishedAt: Date,
  title: string,
  href: string,
};

const postIndex: Post[] = [
  { title: 'Towards a Distributed Web', publishedAt: new Date('2017-08-29T09:17:29.107-0800'), href: '/log/2017-08-towards-a-distributed-web/' },
  { title: 'Oh, hai there', publishedAt: new Date('2017-08-29T08:25:32.153-0800'), href: '/log/2017-08-oh-hai-there/' },
];

const PostListing = ({ href, publishedAt, title }: Post) => (
  <div>
    <span>{utils.formatPostTimestamp(publishedAt)}</span>
    <Link href={href}><a>{title}</a></Link>
  </div>
);

export default () => (
  <PageLayout>
    <div>
      {postIndex.map(post => (
        <PostListing {...post} />
      ))}
    </div>
  </PageLayout>
);
