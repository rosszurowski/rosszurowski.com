// @flow

import React from 'react';
import Link from 'next/link';
import markdown from 'markdown-in-js';
import utils from 'lib/utils';

import PageLayout from 'components/layouts/page';

export const markdownConfig = {
  h1: (props: any) => <h1 className="mv-4 fw-bold" {...props} />,
  h2: (props: any) => <h2 className="mv-4 fw-bold" {...props} />,
  h3: (props: any) => <h3 className="mv-4 fw-bold" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="pv-1 pl-3 mv-3">
      {props.children}
      <style jsx>{`
        blockquote {
          border-left: 2px #ccc solid;
        }
      `}</style>
    </blockquote>
  ),
  ul: (props: any) => <ul className="mv-4" {...props} />,
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  a: (props: any) => <a className="post-link" target="_blank" rel="noopener noreferrer" {...props} />,
  pre: (props: any) => <pre className="bgc-lightGray" {...props} />,
  code: (props: any) => <code className="bgc-lightGray ff-mono" {...props} />,
};

type Props = {
  title: string,
  publishedAt: Date,
  content: string,
};

const PostLayout = ({ content, title, publishedAt }: Props) => (
  <PageLayout title={title}>
    <main className="post ff-sans fs-18 ma-6">
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
    <style jsx>{`
      .post {
        letter-spacing: 0.1px;
        line-height: 1.8;
        max-width: 600px;
      }

      .post :global(a) {
        color: #9a72fa;
        padding-bottom: 2px;
        border-bottom: 1px solid rgba(154, 114, 250, 0.35);
        transition: border-bottom-color 200ms ease;
      }

      .post :global(a:hover) {
        border-bottom: 1px solid rgba(154, 114, 250, 0.7);
      }

      .post :global(code),
      .post :global(pre) {
        font-size: 15px;
        border-radius: 2px;
      }

      .post :global(pre) {
        padding: 0.75em;
        overflow-x: scroll;
      }

      .post :global(code) {
        padding: 0.15em 0.25em;
      }

      .post :global(p + p) {
        margin-top: 1.5rem;
      }
    `}</style>
  </PageLayout>
);

export default PostLayout;
