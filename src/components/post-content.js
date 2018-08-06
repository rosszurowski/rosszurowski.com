import React from 'react';
import { css } from 'react-emotion';
import theme from '../lib/theme';

const className = css`
  font-size: ${theme.fontSize[18]};
  line-height: 1.6;

  & a {
    color: ${theme.colors.purple};
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(154, 114, 250, 0.35);
    transition: border-bottom-color 200ms ease;
  }

  & a:hover {
    border-bottom: 1px solid rgba(154, 114, 250, 0.7);
  }

  & blockquote {
    padding-left: ${theme.spacing[3]};
    margin-top: ${theme.spacing[4]};
    border-left: 2px #e2e2e2 solid;
  }

  & h1,
  & h2,
  & h3 {
    margin-top: ${theme.spacing[5]};
    margin-bottom: ${theme.spacing[4]};
    font-size: ${theme.fontSize[22]};
    font-weight: ${theme.fontWeight.bold};
  }

  & hr {
    border: 0;
    padding-top: 2rem;
    margin-bottom: 3.5rem;
    border-bottom: 2px solid #e2e2e2;
    max-width: 50px;
  }

  & ul {
    list-style: none;
    margin-top: ${theme.spacing[4]};
    padding-left: 1.25em;
    text-indent: -1.25em;
  }

  & ul li {
    margin-top: 0.15em;
    margin-bottom: 0.15em;
  }

  & ul li:before {
    content: '•';
    margin-right: 0.75em;
  }

  & code,
  & pre {
    font-family: ${theme.fontFamily.mono};
    font-size: 15px;
    border-radius: 2px;
  }

  & code {
    background: ${theme.colors.lightGray};
  }

  & pre {
    padding: 0.75em;
    overflow-x: scroll;
  }

  & code {
    padding: 0.15em 0.25em;
  }

  & * + *:not(div) {
    margin-top: 1.5rem;
  }
`;

const PostContent = ({ html }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

export default PostContent;
