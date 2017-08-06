import React from 'react';
import Post from 'components/100/post';

import { spacing } from 'lib/100/styles';

type Props = {
  posts: Array<Object>,
}

const PostList = ({ posts }: Props) => (
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

export default PostList;
