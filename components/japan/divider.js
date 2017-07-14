import React from 'react';
import PropTypes from 'prop-types';

const Divider = () => (
  <div>
    <style jsx>{`
      div {
        background: #f2f2f2;
        display: inline-block;
        width: 5rem;
        height: 0.5rem;
      }
    `}</style>
  </div>
);

Divider.propTypes = {
  type: PropTypes.oneOf(['sleep', 'travel']).isRequired,
};

export default Divider;
