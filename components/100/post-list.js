import React from 'react';
import PropTypes from 'prop-types';

import Post from 'components/100/post';

import { spacing } from 'lib/100/styles';

const PostList = ({ posts }) => (
  <div>
    {posts.map(post => (
      <div className="post" key={post.id}>
        <Post {...post} />
      </div>
    ))}
    <style jsx>{`
      .post {
        max-width: 1200px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      }

      @media only screen and (min-width: 479px) {
        .post {
          margin-top: ${spacing[5]};
          margin-bottom: ${spacing[5]};
        }
      }
    `}</style>
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
