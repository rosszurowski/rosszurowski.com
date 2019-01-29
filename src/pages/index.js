import React, { Component } from 'react';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import Layout from '../components/layout';
import Header from '../components/header';
import HeatDistortion from '../components/heat-distortion';
import CVPanel from '../components/home-cv-panel';

const StyledContainer = styled.div`
  & p a,
  & ul a {
    color: inherit;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    text-decoration: none;
    transition: opacity 200ms ease;
  }

  & p a:hover,
  & ul a:hover {
    opacity: 0.8;
  }
`;

const StyledAside = styled.aside`
  writing-mode: vertical-lr;

  /* Firefox doesn't support writing-mode with flexbox, so lets disable this for now */
  @media only screen and (min-width: 479px) {
    & {
      display: none;
    }
    &:not(*:root) {
      display: block;
    }
  }
`;

const LinkDivider = () => (
  <span
    className="d-none d-inlineBlock-s fs-13 ph-2 p-relative"
    style={{ top: -2 }}>
    •
  </span>
);

export default class HomePage extends Component {
  render() {
    const { data } = this.props;

    return (
      <Layout dark>
        <StyledContainer className="x-s xa-stretch">
          <div className="x-1 x-auto p-relative pa-3 pa-5-s z-1">
            <div className="mw-540">
              <Header />
              <div className="mb-5 lh-1d2">
                <a href="/">Ross Zurowski</a>
                <ul className="x xd-column xd-row-s xa-start mt-1 fs-13 o-75p">
                  <li>
                    <a
                      href="mailto:ross@rosszurowski.com"
                      target="_blank"
                      rel="noopener noreferrer">
                      ross@rosszurowski.com
                    </a>
                  </li>
                  <li>
                    <LinkDivider />
                  </li>
                  <li>
                    <a
                      className="mt-1 mt-0-s"
                      href="https://github.com/rosszurowski"
                      target="_blank"
                      rel="noopener noreferrer">
                      Github
                    </a>
                  </li>
                  <li>
                    <LinkDivider />
                  </li>
                  <li>
                    <a
                      className="mt-1 mt-0-s"
                      href="https://are.na/ross-zurowski"
                      target="_blank"
                      rel="noopener noreferrer">
                      Are.na
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <p>Designer and developer from Toronto.</p>
                <p className="mt-3">
                  Most recently at{' '}
                  <a
                    href="https://watsi.org/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Watsi
                  </a>
                  , designing healthcare software to{' '}
                  <span className="ws-noWrap">benefit low</span>
                  -income populations around the world.
                </p>
              </div>
              <div className="mb-4">
                <h4 className="mb-3 c-pink">CV</h4>
                <CVPanel
                  name="Watsi"
                  href="https://watsi.org/"
                  period="2016 – 2018"
                />
                <CVPanel
                  name="Format"
                  href="https://format.com/themes/"
                  period="2013 – 2016"
                />
                <CVPanel
                  name="Palantir"
                  href="https://palantir.com/"
                  period="2015"
                />
                <CVPanel
                  name="Facebook"
                  href="https://facebook.design/"
                  period="2014"
                />
              </div>
              <div className="mb-4">
                <h4 className="mb-3 c-pink">Recent writing</h4>
                <p>
                  <a href="/log/2019/a-river-a-question-a-bowl">A river, a question, a bowl</a><br/>
                  <a href="/log/2018/small-seasons-long-calendars">Small Seasons, Long Calendars</a><br/>
                  <a href="/log/2017/bodies-at-speed">Bodies at Speed</a><br/>
                  <a href="/log/2017/toward-a-distributed-web">Toward a Distributed Web</a>
                </p>
              </div>
              <div className="mb-5">
                <h4 className="mb-3 c-pink">Recent interests</h4>
                <p>
                  <a href="https://broken-idioms.com">
                    Broken idioms
                  </a>
                  , <span className="ws-noWrap">日本語</span>,{' '}
                  <a
                    href="https://www.are.na/ross-zurowski/language-thought"
                    target="_blank"
                    rel="noopener noreferrer">
                    language and thought
                  </a>
                  ,{' '}
                  <a href="/log/2017/toward-a-distributed-web">
                    decentralized publishing
                  </a>
                  , RSS, and making ice cream.
                </p>
              </div>
              <footer className="fs-13 o-75p">
                <p>
                  This website is also{' '}
                  <a href={data.site.siteMetadata.datUrl}>available via Dat</a>{' '}
                  through{' '}
                  <a href="https://beakerbrowser.com/">Beaker Browser</a>.
                  Source code and past versions of this site are available on{' '}
                  <a href="https://github.com/rosszurowski/rosszurowski.com">
                    Github
                  </a>
                  .
                </p>
              </footer>
            </div>
          </div>
          <StyledAside className="d-none d-block-s pa-4 pa-5-s z-2">
            <div className="x xj-spaceBetween pt-4 h-100p o-50p fs-13">
              <div className="ls-1">{data.site.siteMetadata.gps}</div>
              <div className="ml-auto">
                Last updated {data.site.siteMetadata.buildDate}
              </div>
            </div>
          </StyledAside>
          <HeatDistortion />
        </StyledContainer>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        buildDate(formatString: "MMMM D, YYYY")
        datUrl
        gps
      }
    }
  }
`;
