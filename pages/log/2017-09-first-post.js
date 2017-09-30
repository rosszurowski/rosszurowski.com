// @flow

import React from 'react';
import markdown from 'markdown-in-js';
import PostLayout, { config } from 'components/layouts/post';

const content = markdown(config)`

![](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017-09-first-post/first-web-server.jpg)
<small>Source: [WikiMedia Foundation](#)</small>

Back in the 90’s, sat the computer pictured above: the world’s first web server. On it’s chassis, a post-it note with a warning scrawled: “This machine is a server. DO NOT POWER IT DOWN!”

HTTP follows a client-server model. A client sends a request to the server, then the server does some thinking and returns a response.

What happens if the server can’t be reached? Whatever is stored on that server can’t be shared any longer. That’s why “DO NOT POWER IT DOWN!” was, and remains, a golden rule of the servers that form the internet.

![](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017-09-first-post/opener.jpg)
<small>Source: [Informational Affairs](https://informationalaffairs.com)</small>

Last week I found out that [ffffound](https://ffffound.com) shut down.

I didn’t visit it too often. But when I did, I was always amazed by the variety of stuff on there. Their archive was filled with scans of architectural photography, prints of abstract art, all kinds of images. I don’t even know where this stuff was sourced from, it just kinda ended up on there.

Seeing it gone made me a little sad.

### Now

The web has grown considerably since then.

Hobbyists and scientists used it at first: maintaining servers to share share papers and notes. Links between sites formed communities and collectives.

Over time, people began to group their websites together. Why should everyone maintain their own server when we can all just share one?

Forum platforms, blogging platforms, and social networking platforms cropped up from that idea, making the web accessible to people who didn’t want the burden of running their own web server.

The web has grown, but the core shape of the web hasn’t really changed since that computer in Geneva. We still have servers that can’t shut down. But now, they look more like this.

![](https://rosszurowski-assets.s3.amazonaws.com/rosszurowski.com/log/2017-09-first-post/google-data-center.jpg)

Who started paying for all these computers? Who pays to power them and keep them cool and replace their broken hard drives?

### Corporate Web

The way the web has grown is a by-product of the technical decisions made at its outset.

“DO NOT POWER THIS SERVER DOWN!” is a pointer to the reality that there’s only one source and one point of failure. And when there’s one point of failure, the only way to survive is to get as big as possible.

The way the web grew is because they way HTTP is built. People talk about the web being decentralized, but at the HTTP layer, it’s actually very centralized:

* A domain name can only point to one server
* A request-response structure relies on a single server
* A server hides the code it runs
* A databases is easiest to store on one server
* A team of people working on websites, salaries paid by a business

The natural structure to come into the web was the free market. The web favours the structure of the business. And its shape maps nicely to the shape of the web:

* Business → Consumer
* Server → Client

We’re now living through the consequences of web businesses getting as big as possible.

The internet now has [a GDP that rivals the largest countries](https://internetassociation.org/121015econreport/). Today, about [a third of the web](https://www.theatlantic.com/technology/archive/2016/01/amazon-web-services-data-center/423147/) is hosted on Amazon’s servers. The top 5 websites now account for [almost 60% of all internet traffic](#).

As the web has grown into a few large companies, the implications of this centralization have started to reveal themselves:

* Governments restricting access to public information[^ethopia]
* “Walled-garden” platforms [monetizing attention and personal data](http://idlewords.com/talks/what_happens_next_will_amaze_you.htm) in questionable ways
* Web communities [shutting down](#) after being acquired
* Or the same communities [being forced into investor funding](#soundcloud) after being pushed into public prominence
* Venture capitalist wealth now

### Tomorrow

The assumptions behind a centralized web was one made 30 years ago in a context that’s very different than the one we live in now. No malice was put into that decision. Centralized systems are certainly easier solution to build.

But we shouldn’t be beholden to the past when our context has changed so deeply. We should be open to challenging the assumptions of our tools.

* What affordances are baked into our tools?
* Who do those affordances help and who do they hurt?
* Are they leading towards a future we want?

The great thing about computers is that they’re easy to change.

If we feel discontent with the state of the web, and the state of the web is a result of what’s easy to do, all we have to do is find new ways of making new ways of doing things easier.

Especially with the [visions for the future that big tech companies](https://www.are.na/jon-kyle-mohr/tech-ethnography) are handing to us.

### Distributed web

One such way that’s gaining traction right now is initiatives to build a more distributed web. Distributed in the way that, BitTorrent is distributed: no _one_ person hosts files. Instead, they are published and re-published by everyone using them.

The end experience is similar: people can access documents on the web. But it’s a fundamental shift to the shape of the web to something that looks more like this:

/structure-bittorrent.png

Which results in an actor network that looks more like this:

* Owner/Employee
* Producer/Consumer
* Server/Client

The distance between the roles collapses. Everyone is both a server and a client; a consumer and a producer.

(For the sake of continuing the internet–marketplace parallel, a distributed web could be seen in the world of business as [a co-operative](https://en.wikipedia.org/wiki/Cooperative).)

Scientists, as with the early days of the web, are pushing this movement forward:

* [Sci-Hub](http://sci-hub.io/), a public BitTorrent archive of otherwise paywalled journal articles, has been the topic of much discussion
* [Dat](https://datproject.org), a platform for sharing large scientific datasets has become one of the prominent technical structures for a future distributed web.

There’s also [neat conversations happening](https://www.thewire.co.uk/in-writing/interviews/robert-barry-talks-to-mat-dryhurst-about-soundcloud) about using financial tools like cryptocurrency to enable more cooperative systems of web ownership:

> [By using cryptocurrency] it is now possible to create and distribute tokens – and in turn distribute and track ownership – to large groups of people who hold these liquid assets
> … it means visionary projects that may require hundreds of millions of dollars to execute no longer have to sell their business model to venture capitalists.
> — [Mat Dryhurst](https://www.thewire.co.uk/in-writing/interviews/robert-barry-talks-to-mat-dryhurst-about-soundcloud)

I’m skeptical of people applying cryptocurrency to all the world’s problems (s/o [@malqinneh](https://twitter.com/malqinneh)), but when it comes to finding ways of distributing ownership and value, they seem to have some promise.

### Distributed now

Much of the infrastructure behind a distributed web is still early-stage. But, to people who work on or have an interest in the web, many of the solutions are pretty easy to start with today.

I’d recommend checking out [Beaker Browser](https://beakerbrowser.com) , which is built on top of [Dat](https://datproject.org). Of the many projects exploring this space, they seem to be the furthest along in making a distributed web accessible to folks. Beaker Browser actually makes publishing a website on the distributed web _easier_ than the classic “buy a server and set up FTP” system we’re all used to. [^beaker]

The social implications of data ownership and a distributed web can seem distant from daily life. But the more I read, the more I’m convinced that this subject will likely be one of the core issues of our time.

As with politics, we as web citizens have a responsibility to explore and advocate for better systems. Systems that favour a future that serves people, not a marketplace.

[^ethopia]: The Ethiopian government [shuts down the internet](https://www.theguardian.com/technology/2017/may/31/ethiopia-turns-off-internet-students-sit-exams) across the country during exam periods, supposedly in an attempt to curb cheating. Turkey [has done the same thing](#) to curb political interventions.
[^beaker]: If you want to try this on your own website, [Tom MacWright](https://macwright.org) has a good [article on the subject](https://macwright.org/2017/07/20/decentralize-your-website.html).
`;

console.log(content);

const post = {
  title: 'First Post',
  publishedAt: new Date(2017, 8, 7),
};

export default () => (
  <PostLayout {...post}>
    {content}
  </PostLayout>
);
