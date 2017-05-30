import React from 'react';
import PropTypes from 'prop-types';

const ParagraphContainer = ({ className, ...props }) => (
  <div className={`w-90 mw5 mv4 mv5-m center ${className}`} {...props} />
);

ParagraphContainer.propTypes = {
  className: PropTypes.string,
};

ParagraphContainer.defaultProps = {
  className: '',
};

export default ParagraphContainer;
