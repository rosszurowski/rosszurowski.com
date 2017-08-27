import React, { Component } from 'react';

const createMediaQueries = media => Object.keys(media).map((key) => {
  const mediaQueryString = media[key];
  const match = typeof window !== 'undefined' ? window.matchMedia(mediaQueryString) : { matches: false, addListener: () => {} };
  const initialValue = match.matches;
  const subscribe = (onChange) => {
    const handler = (e) => { onChange({ [key]: e.matches }); };
    match.addListener(handler);
    return () => match.removeListener(handler);
  };

  return { key, initialValue, subscribe };
});

const initialState = queries => queries.reduce((acc, query) => {
  acc[query.key] = query.initialValue;
  return acc;
}, {});

const createMediaSubscription = media => ({
  subscribe: (onMediaChange) => {
    const queries = createMediaQueries(media);
    onMediaChange(initialState(queries));
    const unsubscribes = queries.map(query => query.subscribe(onMediaChange));
    return () => {
      unsubscribes.forEach(fn => fn());
    };
  },
});

const withMediaQuery = media => (WrappedComponent) => {
  const subscription = createMediaSubscription(media);
  class ResponsiveComponent extends Component {
    componentWillMount () {
      this.unsubscribe = subscription.subscribe(state => this.setState(state));
    }

    componentWillUnmount () {
      this.unsubscribe();
    }

    render () {
      return (
        <WrappedComponent {...this.state} {...this.props} />
      );
    }
  }
  return ResponsiveComponent;
};

export default withMediaQuery;
