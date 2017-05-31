import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ children, external, ...props }) => (
  <a target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} {...props}>
    {children}
    <style jsx>{`
      a {
        color: #fc3a57;
        border-bottom: 2px transparent solid;
        text-decoration: none;
      }

      a:hover {
        border-bottom-color: rgba(252, 58, 87, 0.8);
      }
    `}</style>
  </a>
);

Link.propTypes = {
  children: PropTypes.any.isRequired,
  external: PropTypes.bool,
  href: PropTypes.string.isRequired,
};

Link.defaultProps = {
  external: false,
};

export default Link;
