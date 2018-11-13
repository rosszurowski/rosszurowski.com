import React from 'react';
import styled from 'react-emotion';
import theme from '../lib/theme';

const StyledPostContent = styled.div`
  font-size: ${theme.fontSize[18]};
  line-height: 1.6;

  & > * + *:not(div):not(li):not(h1):not(h2):not(h3) {
    margin-top: 1.5rem;
  }

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
    padding-left: 1.125em;
    margin-top: ${theme.spacing[4]}px;
    border-left: 2px #e2e2e2 solid;
    color: rgb(119, 119, 125);
  }

  & h1,
  & h2,
  & h3 {
    margin-top: ${theme.spacing[5]}px;
    margin-bottom: ${theme.spacing[3]}px;
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

  & ul,
  & ol {
    margin-top: ${theme.spacing[4]}px;
    padding-left: 1.25em;
  }

  & ul {
    list-style: none;
    text-indent: -1.25em;
  }

  & li {
    line-height: 1.75;
  }

  & li + li {
    margin-top: 0.75em;
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

  & .footnotes hr {
    margin: 2rem auto 3.5rem;
  }

  & .footnotes li {
    font-size: 0.875rem;
  }

  & .footnotes li p {
    display: inline;
  }

  & sup {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0 0.25em;
  }

  & a.footnote-ref,
  & a.footnote-backref {
    border-bottom: none;
    padding: 0;
  }
`;

const PostContent = ({ html }) => (
  <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
);

export default PostContent;
