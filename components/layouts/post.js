// @flow

import React from 'react';
import Link from 'next/link';
import markdown from 'markdown-in-js';
import utils from 'lib/utils';

import PageLayout from 'components/layouts/page';

import Header from 'components/log/header';
import Blockquote from 'components/log/blockquote';
import List from 'components/log/list';
import Paragraph from 'components/log/paragraph';

export const compile = markdown({
  h1: props => <Header large {...props} />,
  h2: props => <Header medium {...props} />,
  h3: props => <Header {...props} />,
  blockquote: Blockquote,
  p: Paragraph,
  ul: List,
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  a: props => <a target="_blank" rel="noopener noreferrer" {...props} />,
});

type Props = {
  title: string,
  publishedAt: Date,
  content: string,
};

const PostLayout = ({ content, title, publishedAt }: Props) => (
  <PageLayout title={title}>
    <main className="ff-sans fs-18 ma-6" style={{ maxWidth: '30em', lineHeight: 1.5 }}>
      <div className="h-5" />
      <header>
        <div className="o-50p">{utils.formatPostTimestamp(publishedAt)}</div>
        <div>{title}</div>
      </header>
      <div className="h-5" />
      {content}
      <div className="mt-5">
        <Link href="/"><a>Back home</a></Link>
      </div>
    </main>
    <style jsx global>{`
      a {
        color: #9a72fa;
        border-bottom: 2px solid currentColor;
      }

      p + p {
        margin-top: 1.5rem;
      }
    `}</style>
  </PageLayout>
);

export default PostLayout;
