import React from 'react';
import Post from 'components/100/post';

type Props = {
  posts: Array<Object>,
}

const PostList = ({ posts }: Props) => (
  <div>
    {posts.map(post => (
      <div className="w-100p mw-1200 mh-auto mv-5-s" key={post.id}>
        <Post {...post} />
      </div>
    ))}
  </div>
);

export default PostList;
