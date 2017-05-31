import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ children }) => (
  <div>
    <p>{children}</p>
  </div>
);

Paragraph.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Paragraph;
