import React from 'react';
import PropTypes from 'prop-types';

const Blockquote = ({ children }) => (
  <blockquote className="pl3">
    {children}
    <style jsx>{`
      blockquote {
        color: #666;
        font-size: 0.8rem;
        line-height: 1.5;
        border-left: 4px #f2f2f2 solid;
      }
    `}</style>
  </blockquote>
);

Blockquote.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Blockquote;
