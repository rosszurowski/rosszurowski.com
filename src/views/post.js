import React, { Component } from 'react';
import Head from 'react-helmet';
import tinytime from 'tinytime';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import Header from '../components/header';
import Icon from '../components/icon';
import PostContent from '../components/post-content';

const formatTimestamp = tinytime('{MMMM} {DD}, {YYYY}').render;

const StyledContent = styled.div`
  max-width: 640px;
`;

const StyledMetadata = styled.header`
  max-width: 240px;
`;

const BackLink = ({ isMobile = false }: { isMobile?: boolean }) => (
  <a href="/" className="o-50p h-fade">
    <span
      className="d-inlineBlock"
      style={{ transform: 'scale(-1, 1)', marginLeft: isMobile ? 0 : -32 }}>
      <Icon name="arrow" size={32} iconSize={12} />
    </span>
    Back home
  </a>
);

export default class PostPage extends Component {
  render() {
    const { data } = this.props;
    const { markdownRemark: post } = data;

    const date = new Date(post.fields.date);

    return (
      <Layout>
        <div className="pa-3 pb-6 ph-4-s ph-5-m pt-5-m">
          <Head>
            <title>{post.frontmatter.title}</title>
            <meta
              name="description"
              content={post.frontmatter.description || post.excerpt}
            />
          </Head>
          <Header />
          <article className="x-m fs-18">
            <StyledMetadata className="x x-1 xd-column xj-spaceBetween mb-5 mb-0-m mr-5-s mr-6-m">
              <div>
                <h1 className="c-purple">{post.frontmatter.title}</h1>
                <time className="o-50p" dateTime={date.toISOString()}>
                  {formatTimestamp(date)}
                </time>
              </div>
              <div className="d-none d-block-m mt-5">
                <BackLink />
              </div>
            </StyledMetadata>
            <StyledContent>
              <PostContent html={post.html} />
            </StyledContent>
            <div className="d-block d-none-m mv-6">
              <BackLink isMobile />
            </div>
          </article>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        date
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
