import React from 'react';
import PropTypes from 'prop-types';

const LazyloadVideo = ({ srcset, alt }) => (
  <video>
    <p>Cannot load! {alt}</p>
  </video>
);

LazyloadVideo.propTypes = {
  srcset: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired,
};

export default LazyloadVideo;
