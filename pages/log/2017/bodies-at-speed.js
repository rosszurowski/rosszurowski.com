// @flow
import React from 'react';
import PostLayout, { config } from 'components/layouts/post';
import markdown from 'markdown-in-js';

const content = markdown(config)`
Earlier this year, Elon Musk [announced that he got verbal approval](https://twitter.com/elonmusk/status/888053175155949572) to build an underground Hyperloop between New York and D.C.

Travel is one of those perennial human problems, and over the years we've devised [increasingly complex solutions](https://techrato.com/wp-content/uploads/2017/04/the_boring_company_concept_3.gif) to move people and things from one place to another. Bikes, trains, cars, planes. Each new solution lets us travel quicker than before, but it also requires more maintenance, more safety equipment, more rules and regulation.

In university I was introduced to the writings of Paul Virilio, a French cultural theorist. One of his most well known ideas, [the integral accident](https://en.wikipedia.org/wiki/Paul_Virilio#The_integral_accident), is summarized in this quote:

> When you invent the ship, you also invent the shipwreck; when you invent the plane you also invent the plane crash.

It's a meaty statement about our tumultuous relationship. But, how big the idea is, all I can ever think is what it means for objects moving at high speeds.

Moving faster _inherently_ creates more risk. Even when the risks are well-controlled (plane rides are statistically safer than driving, right?) they are never gone. A rocket will always have more dangerous _potential_ than a car.

Greater velocity equals greater consequences when things go wrong. There's no getting around that, no matter how many safeguards you implement.

It’s always interesting to see innovative approaches to age old problems. But, in my head, complex solutions never seem [quite as appropriate](https://en.wikipedia.org/wiki/Appropriate_technology) as ways to use simpler ones, like walking, biking, and creating more dense urban spaces.
`;

const post = {
  title: 'Moving Bodies at Speed',
  publishedAt: new Date('2017-10-15T22:46:00'),
};

export default () => <PostLayout {...post}>{content}</PostLayout>;
