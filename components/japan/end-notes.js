import React from 'react';
import PropTypes from 'prop-types';

const EndNotes = ({ children, ...props }) => (
  <footer {...props}>
    {children}
    <style jsx>{`
      footer {
        color: #777;
        font-size: 0.6rem;
      }
    `}</style>
  </footer>
);

EndNotes.propTypes = {
  children: PropTypes.any.isRequired,
};

export default EndNotes;
