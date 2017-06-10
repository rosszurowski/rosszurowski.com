import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tinytime from 'tinytime';

import PostImage from 'components/100/post-image';

import { color, font, spacing } from 'lib/100/styles';

const formatPostDate = tinytime('{MM} {DD}, {YYYY}').render;

class Post extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
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
      <article id={id}>
        <div className="day">
          <div className="id"><a href={`#${id}`}>Day {id}</a></div>
          <div className="date"><a href={`#${id}`}>{formatPostDate(new Date(date))}</a></div>
        </div>
        <figure>
          <PostImage src={src} alt={location} width={width} height={height} />
        </figure>
        <style jsx>{`
          article {
            padding-top: ${spacing[5]};
            padding-bottom: ${spacing[5]};
          }

          .day {
            font-size: ${font.size[4]};
            text-align: center;
          }

          .day .date {
            color: ${color.gray};
          }

          figure {
            margin-top: ${spacing[5]};
            text-align: center;
          }

          figure img {
            object-fit: contain;
            max-width: 100%;
            /**
             * NOTE: the image has a dynamic 'height' attribute applied, which
             * is necessary for this 'max-height' to have an effect.
             */
            max-height: 82vh;
          }

          .metadata {
            display: flex;
            justify-content: space-between;
            margin: ${spacing[3]} auto 0;
            color: ${color.gray};
            font-size: ${font.size[1]};
            line-height: ${font.lineHeight.loose};
            width: 90vw;
            opacity: 1.0;
            transition: opacity 200ms ease 50ms;
          }

          .metadata.is-loading {
            opacity: 0.0;
          }
        `}</style>
      </article>
    );
  }
}

export default Post;
