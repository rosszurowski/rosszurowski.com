// @flow

import React, { type Node } from 'react';
import Link from 'next/link';
import marksy from 'marksy';
import utils from 'lib/utils';

import PageLayout from 'components/layouts/page';
import Reset from 'components/styles/reset';
import FontFaceCalibre from 'components/styles/font-face-calibre';
import Utilities from 'components/styles/utilities';

import Blockquote from 'components/log/blockquote';
import List from 'components/log/list';
import Paragraph from 'components/log/paragraph';

const compile = marksy({
  createElement: React.createElement,
  elements: {
    blockquote: Blockquote,
    p: Paragraph,
    ul: List,
  },
});

type Props = {
  title: string,
  publishedAt: Date,
  content: string,
};

const PostLayout = ({ content, title, publishedAt }: Props) => (
  <PageLayout title={title}>
    <Reset />
    <FontFaceCalibre />
    <Utilities />
    <main className="ff-sans fs-22 ma-6" style={{ maxWidth: '30em', lineHeight: 1.5 }}>
      <div>
        <Link href="/"><a>Back home</a></Link>
      </div>
      <div className="h-5" />
      <header>
        <div className="o-50p">{utils.formatPostTimestamp(publishedAt)}</div>
        <div>{title}</div>
      </header>
      <div className="h-5" />
      {compile(content).tree}
    </main>
    <style jsx global>{`
      a {
        color: red;
        border-bottom: 1px solid currentColor;
      }
    `}</style>
  </PageLayout>
);

export default PostLayout;
