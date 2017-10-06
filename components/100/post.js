import React, { Component } from 'react';
import tinytime from 'tinytime';

import PostImage from 'components/100/post-image';

const formatPostDate = tinytime('{MM} {DD}, {YYYY}').render;

class Post extends Component {
  props: {
    id: number,
    date: string,
    src: string,
    location: string,
    dimensions: { width: number, height: number },
  }

  state = {
    renderedWidth: -1,
  }

  handleImageMeasure = (dimensions) => {
    const { width } = dimensions;
    const renderedWidth = Math.floor(width);

    this.setState({ renderedWidth });
  }

  render () {
    const { id, date, src, location, dimensions } = this.props;
    const { width, height } = dimensions;

    return (
      <article className="pv-5 ta-center" id={id}>
        <div className="fs-22">
          <div><a href={`#${id}`}>Day {id}</a></div>
          <div className="o-50p mt-2"><a href={`#${id}`}>{formatPostDate(new Date(date))}</a></div>
        </div>
        <figure className="mt-5">
          <PostImage src={src} alt={location} width={width} height={height} />
        </figure>
      </article>
    );
  }
}

export default Post;
