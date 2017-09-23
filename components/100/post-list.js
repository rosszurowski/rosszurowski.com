import React from 'react';
import Post from 'components/100/post';

type Props = {
  posts: Array<Object>,
}

const PostList = ({ posts }: Props) => (
  <div>
    {posts.map(post => (
      <div className="post mh-auto mv-5-s" key={post.id}>
        <Post {...post} />
      </div>
    ))}
    <style jsx>{`
      .post {
        max-width: 1200px;
        width: 100%;
      }
    `}</style>
  </div>
);

export default PostList;
