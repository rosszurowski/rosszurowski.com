// @flow

import React from 'react';

type Props = {
  className?: string,
}

const ParagraphContainer = ({ className, ...props }: Props) => (
  // $FlowFixMe: Flow doesn't support defaultProps in functional components
  <div className={`w-90 mw5 mv4 mv5-m center ${className}`} {...props} />
);

ParagraphContainer.defaultProps = {
  className: '',
};

export default ParagraphContainer;
