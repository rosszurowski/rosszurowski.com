// @flow

import React from 'react';
import type { Node } from 'react';
import Link from 'next/link';
import utils from 'lib/utils';

import PageLayout from 'components/layouts/page';
import ZigZag from 'components/icons/zig-zag';
import Arrow from 'components/icons/arrow';

export const config = {
  h1: (props: any) => <h1 className="mt-5 mb-4 fs-22 fw-bold" {...props} />,
  h2: (props: any) => <h2 className="mt-5 mb-4 fs-22 fw-bold" {...props} />,
  h3: (props: any) => <h3 className="mt-5 mb-4 fs-22 fw-bold" {...props} />,
  blockquote: (props: any) => <blockquote className="pl-3 mv-4" {...props} />,
  ul: (props: any) => <ul className="mv-4" {...props} />,
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  a: (props: any) => <a className="post-link" target="_blank" rel="noopener noreferrer" {...props} />,
  pre: (props: any) => <pre className="bgc-lightGray" {...props} />,
  code: (props: any) => <code className="bgc-lightGray ff-mono" {...props} />,
};

type Props = {
  title: string,
  publishedAt: Date,
  children: Node,
};

const PostLayout = ({ children, title, publishedAt }: Props) => (
  <PageLayout title={title}>
    <main className="ff-sans lh-1d7 pa-5 pb-6">
      <header className="mb-6">
        <Link href="/">
          <a className="h-fade"><ZigZag fill="black" /></a>
        </Link>
      </header>
      <article className="x fs-18">
        <header className="x xd-column xj-spaceBetween mr-6">
          <div>
            <div className="c-purple">{title}</div>
            <div className="o-50p">{utils.formatPostTimestamp(publishedAt)}</div>
          </div>
          <div className="mt-5">
            <Link href="/">
              <a>
                <span className="d-inlineBlock mr-2" style={{ top: -2, transform: 'scale(-1, 1)', marginLeft: -22 }}><Arrow width={14} /></span>
                Back home
              </a>
            </Link>
          </div>
        </header>
        <div className="post mr-5">
          {children}
        </div>
      </article>
    </main>
    <style jsx>{`
      .c-purple {
        color: #9a72fa;
      }

      .x-x {
        flex: 1 0 auto;
      }

      .post {
        font-size: 17px;
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

      .post :global(blockquote) {
        border-left: 2px #ccc solid;
      }

      .post :global(ul) {
        list-style: none;
        padding-left: 1.25em;
        text-indent: -1.25em;
      }

      .post :global(ul li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .post :global(ul li:before) {
        content: '•';
        margin-right: 0.75em;
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
