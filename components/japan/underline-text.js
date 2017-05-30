import React from 'react';
import PropTypes from 'prop-types';
import utils from 'lib/utils';

const generateUnderlineStyles = type => `background-image: url('${utils.getAssetUrl(`2017/japan/underline-${type}.svg`)}');`;

const UnderlineText = ({ type, children, ...props }) => (
  <span className={`underline-${type}`} {...props}>
    {children}
    <style jsx>{`
      span {
        background-position: 0 bottom;
        background-repeat: no-repeat;
        background-size: 100%;
        padding-bottom: 0.1rem;
        padding-left: 0.25em;
        padding-right: 0.25em;
        margin-left: -0.25em;
        margin-right: -0.25em;
      }

      span.underline-tokyo-1 { ${generateUnderlineStyles('tokyo-1')} }
      span.underline-tokyo-2 { ${generateUnderlineStyles('tokyo-2')} }
      span.underline-kobe { ${generateUnderlineStyles('kobe')} }
      span.underline-kyoto { ${generateUnderlineStyles('kyoto')} }
      span.underline-takamatsu { ${generateUnderlineStyles('takamatsu')} }
      span.underline-naoshima { ${generateUnderlineStyles('naoshima')} }
      span.underline-nara { ${generateUnderlineStyles('nara')} }
      span.underline-osaka { ${generateUnderlineStyles('osaka')} }
      span.underline-hakone { ${generateUnderlineStyles('hakone')} }
      span.underline-kamakura {
        ${generateUnderlineStyles('kamakura')}
        padding-bottom: 0.2rem;
      }

    `}</style>
  </span>
);

UnderlineText.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
};

export default UnderlineText;
