// @flow
import React from 'react';
import PostLayout, { config } from 'components/layouts/post';
import markdown from 'markdown-in-js';

const content = markdown(config)`
![](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017/toward-a-distributed-web/awh-snap.png)

Last week I discovered that [ffffound](https://ffffound.com) shut down.

I didn’t visit it often, but when I did, I was amazed by the variety of stuff on there. The site was an archive full of architectural photography, abstract art scans, and all kinds of other images. Seeing it gone made me a little sad.

Back in February, [Vine](https://www.theverge.com/2016/10/28/13456208/why-vine-died-twitter-shutdown) also shut down. Only a few months later, people shared similar [doubts about SoundCloud’s future](https://techcrunch.com/2017/07/12/soundshroud/).

Often supported entirely by ad money, these community-companies on the web seem to struggle to stay online.

When conversations about internet shutdowns come up, people often ask, “what was their business model?” But, isn’t the web supposed to be an open, global community? Why is a business model a necessity for someone to make a meaningful site?

More and more, the web feels like a playground for businesses than [the information superhighway](https://en.wikipedia.org/wiki/Memex) it was originally conceived as.

### Early Days

![The first web server, at CERN in Geneva](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017/toward-a-distributed-web/first-web-server.jpg)
<small>Tim Berners-Lee’s NeXT workstation ([source](https://commons.wikimedia.org/wiki/File:First_Web_Server.jpg))</small>

The computer pictured above is the world’s first web server. Built to share documents amongst scientists at CERN, it was the first use of the HTTP protocol, the system that drives the internet. Colleagues of Tim Berners-Lee could access files on his computer from anywhere else in their local network.

On its casing is a sticky note warning: “This machine is a server. DO NOT POWER IT DOWN!” Makes sense. If the server is down, nobody can read the files on it.

This little sticky note is a clue to a fundamental concept behind HTTP: it's a request-response protocol. A "client" makes a request, and the "server" sends a response. One computer has a file, and many others ask for it. One server, many clients.

In other words, if you were to map out how file sharing worked at CERN, it’d look a little like this:

![](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017/toward-a-distributed-web/structure-http.png)

### These Days

The web has grown a lot since its early days. Instead of sticky notes on computers, internet infrastructure looks a little more like this:

![](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017/toward-a-distributed-web/google-data-center.jpg)
<small>Google Data Center in Finland ([source](https://www.google.com/about/datacenters/gallery/#/tech))</small>

How we use it has changed too. We’re not just passing around text files, but images, videos, articles, and applications.

But the shape is still fundamentally the same. A domain name points to a single server. One server fields requests, responding to many clients.

The one-to-many shape leads to some interesting consequences.

For one, its enabled the rise of the “platform web.” Not everyone can or wants to run their own server, so people make platforms where others can contribute _without owning a server_: writing blog posts on Tumblr, sharing images on Flickr, putting life events on Facebook, etc. But running these platforms has costs, and over time, some platforms win out over others.

The platform web has become a marketplace. The only way to survive is to get as big as possible, hence our current world, where [a few platforms account for over 60% of all web traffic]().

And when one person or organization hosts all the code and all the data, the power dynamic changes.

* Facebook owns the server, so only they can see the code that decides what news to show you. To everyone else, its a black box
* Google owns the servers holding people’s search history, making it easy to surveil without the knowledge or consent of the people putting that data there
* Twitter owns the server, so Twitter gets paid to show you ads
* The easy scalability of computation makes it possible for huge monopolies to form, resulting in more billionaire individuals than ever before in history.

The assumptions of HTTP, expanded to a global scale, enable the centralization information, money, and power in an unprecedented way.

We trust these tech powerhouses to act in our best interest. Computers and networks will lead us to a more open, connected, and democratic future, right? But over and over again, we see [ethically questionable decisions being made by these groups](https://www.are.na/jon-kyle-mohr/tech-ethnography). Over and over again, these groups aren’t held accountable for the power they wield.

### Distributed Web

For all that negativity, there’s tons of exciting work these days to find alternative shapes for the web. Shapes that benefit people, not corporations.

One exciting area is _distributed web technologies_, protocols vying to replace HTTP as the way we pass information across networks. There’s a few projects trying to fill this space. Some bigger ones: [IPFS](https://ipfs.io), [Zeronet](https://zeronet.io/), and [Dat](http://datproject.org/).

Many of these alternatives share a resemblance with BitTorrent: one person starts to host something, and everybody re-hosts it as they view it. Mapping out this structure would look a little more like this:

![](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017/toward-a-distributed-web/structure-bittorrent.png)

The distance between server and client collapses. No one person owns the servers. Instead, everyone is both a server and a client.

If the internet we’re moving towards today is the “corporate web”, distributed web tech tries to move towards a [cooperative](https://en.wikipedia.org/wiki/Cooperative) one: everyone works together to re-host things they’re interested in. Everyone’s responsible for keeping it online, sure, but everyone owns a piece of it.

What may seem like a simple change — a shift in how digital files move about — can have huge impact when applied at scale:

* How does a company make ad money if they can’t control what gets shown to people?
* How do governments track and surveil people if the information was scattered across millions of computers, rather than neatly compiled by one organization in one place?
* How do you monopolize (attention, data, etc) when the only way to grow is with the help of others?

Distributed web protocols no longer give easy solutions to those challenges. The decisions behind decentralization make forming communities easy and forming companies hard.

All the alternatives I listed above are still in their early stages. There’s tons of challenges around usability, financing, and public interest/adoption. But for all the challenges, there’s some amazing opportunities too:

* What if a “like” wasn’t a gesture that told companies what ads to serve you, but instead [helped creators host their work](https://twitter.com/taravancil/status/906585296648765440)?
* What if [the users of a platform could own and invest in its future](https://www.thewire.co.uk/in-writing/interviews/robert-barry-talks-to-mat-dryhurst-about-soundcloud), rather than VC firms looking to make a profit?

Anyways, the big point here is that we don’t need to continue to live out the consequences of technical decisions made 40+ years ago.

We have a responsibility as citizens of the web to challenge the politics embedded in our tools, the futures they’re leading us towards, and to question who they’re really serving.

### Further Reading

* [What is the P2P Web?](https://pfrazee.github.io/blog/what-is-the-p2p-web)
* [Beaker Browser](https://beakerbrowser.com/)
* [So you want to decentralize your website](https://macwright.org/2017/07/20/decentralize-your-website.html)
* [Distributed Now](https://www.jon-kyle.com/entries/2017-08-01-distributed-now)
`;

const post = {
  title: 'Toward a Distributed Web',
  publishedAt: new Date('2017-10-10T23:24:00'),
};

export default () => <PostLayout {...post}>{content}</PostLayout>;
