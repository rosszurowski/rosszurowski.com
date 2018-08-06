import React, { Component } from 'react';
import { push } from 'gatsby';
import Layout from '../components/layout';
import Icon from '../components/icon';

export default class NotFoundPage extends Component {
  componentDidMount() {
    setTimeout(() => {
      push('/');
    }, 1500);
  }

  render() {
    return (
      <Layout>
        <div className="pa-3 pa-5-s">
          <div className="mb-2">
            <Icon name="ded" size={32} iconSize={32} />
          </div>
          <p className="fs-15">
            Page not found. Redirecting you <a href="/">back home</a>
            ...
          </p>
        </div>
      </Layout>
    );
  }
}
