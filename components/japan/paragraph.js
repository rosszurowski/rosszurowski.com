import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ children }) => (
  <div>
    <p>{children}</p>
    <style jsx>{`
      p {
        letter-spacing: 0.25px;
      }
    `}</style>
  </div>
);

Paragraph.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Paragraph;
