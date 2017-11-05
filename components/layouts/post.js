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
  blockquote: (props: any) => <blockquote className="pl-3 mt-4" {...props} />,
  ul: (props: any) => <ul className="mt-4" {...props} />,
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

const BackLink = ({ isMobile = false }: { isMobile?: boolean }) => (
  <Link href="/">
    <a className="o-50p h-fade">
      <span className="d-inlineBlock mr-2" style={{ transform: 'scale(-1, 1)', marginLeft: isMobile ? 0 : -20 }}>
        <Arrow width={12} />
      </span>
      Back home
    </a>
  </Link>
);

const PostLayout = ({ children, title, publishedAt }: Props) => (
  <PageLayout title={title}>
    <div className="ff-sans lh-1d7 pa-3 pb-6 ph-4-s ph-6-m pt-5-m">
      <header className="mb-6">
        <Link href="/">
          <a className="h-fade">
            <ZigZag fill="black" />
          </a>
        </Link>
      </header>
      <article className="x-m fs-18">
        <header className="post-meta x x-1 xd-column xj-spaceBetween mb-5 mb-0-m mr-5-s mr-6-m">
          <div>
            <div className="c-purple">{title}</div>
            <div className="o-50p">{utils.formatPostTimestamp(publishedAt)}</div>
          </div>
          <div className="d-none d-block-m mt-5">
            <BackLink />
          </div>
        </header>
        <div className="post">{children}</div>
        <div className="d-block d-none-m mv-6">
          <BackLink isMobile />
        </div>
      </article>
    </div>
    <style jsx>{`
      .c-purple {
        color: #9a72fa;
      }

      .x-x {
        flex: 1 0 auto;
      }

      .post {
        font-size: 17px;
        max-width: 640px;
      }

      .post-meta {
        max-width: 240px;
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
        margin-top: 0.15em;
        margin-bottom: 0.15em;
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

      .post :global(* + *:not(div)) {
        margin-top: 1.5rem;
      }
    `}</style>
  </PageLayout>
);

export default PostLayout;
