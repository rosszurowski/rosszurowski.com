import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import FontFaceCalibre from 'components/styles/font-face-calibre';
import GlobalStyles from 'components/japan/global-styles';

import Paragraph from 'components/japan/paragraph';
import ParagraphContainer from 'components/japan/paragraph-container';
import Divider from 'components/japan/divider';
import Blockquote from 'components/japan/blockquote';
import PostImage from 'components/japan/post-image';
import PostVideo from 'components/japan/post-video';
import Link from 'components/japan/link';
import UnderlineText from 'components/japan/underline-text';
import EndNotes from 'components/japan/end-notes';

import utils from 'lib/utils';

const meta = {
  title: 'Japan Trip — Ross Zurowski',
  description: '',
  previewImageUrl: utils.getAssetUrl('2017/japan/og-image.jpg'),
};

const JapanTripPage = () => (
  <div>
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />

      <meta name="og:title" content={meta.title} />
      <meta name="og:description" content={meta.description} />
      <meta name="og:image" content={meta.previewImageUrl} />
      <meta name="og:site_name" content="Ross Zurowski" />
    </Head>
    <FontFaceCalibre />
    <GlobalStyles />

    <main className="center mw8 w-90">
      <section id="tokyo" className="pt3 pt6-m">
        <div id="tokyo-arrival">
          <ParagraphContainer>
            <div className="c-gray">May 8 &ndash; 22</div>
            <Paragraph>In May, I took a couple weeks off to visit Japan for my first time.</Paragraph>
            <Paragraph>I flew in on a Monday night. After a brief layover in Hong Kong, I arrived in <UnderlineText type="tokyo-1">Tokyo</UnderlineText> and settled into an Airbnb.</Paragraph>
          </ParagraphContainer>
        </div>
        <div id="tokyo-yoyogi">
          <div className="mw6 center">
            <PostImage srcId="L1020139" alt="View of the Yoyogi neighbourhood in Shibuya" width={1200} height={1800} />
          </div>
          <ParagraphContainer>
            <Paragraph>I woke up at 4am (still getting used to the timezone change) and was surprised to see the sun was already up.</Paragraph>
          </ParagraphContainer>
          <div className="f-m mw8 center">
            <div className="w-50-m pa3"><PostImage srcId="L1020162" alt="Picnic bench at Yoyogi Park" width={1200} height={800} /></div>
            <div className="w-50-m pa3"><PostImage srcId="L1020150" alt="Garbage bin at Yoyogi Park" width={1200} height={800} /></div>
          </div>
          <div className="f-m mw8 center">
            <div className="w-50-m pa3"><PostImage srcId="L1020157" alt="Bike route signage in English" width={1200} height={800} /></div>
            <div className="w-50-m pa3"><PostImage srcId="L1020155" alt="Dog park" width={1200} height={800} /></div>
          </div>
          <ParagraphContainer>
            <Paragraph>My place was in Shibuya near <Link href="https://www.google.com/maps/place/Yoyogi+Park/@35.6708179,139.6849799,15.41z/data=!4m5!3m4!1s0x60188cb479620a33:0x34bcc78ce7f8bf3e!8m2!3d35.671736!4d139.6949447?hl=en" external>Yoyogi park</Link>, one of the largest parks in Tokyo. I walked through here on the first few mornings, stopping to watch the dogs play in the dog park.</Paragraph>
            <Paragraph>There’s something strange about hearing people talk to dogs in another language. Would they understand me if I talked to them?</Paragraph>
          </ParagraphContainer>

          <div className="f-m mw8 center">
            <div className="w-third-m pa3"><PostImage srcId="L1020451" alt="" width={1200} height={800} /></div>
            <div className="w-third-m pa3"><PostImage srcId="L1020444" alt="" width={1200} height={800} /></div>
            <div className="w-third-m pa3"><PostImage srcId="L1020436" alt="" width={1200} height={800} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>Inside Yoyogi park is the Meiji shrine, one of the largest Shinto shrines in Tokyo.</Paragraph>
            <Paragraph>The enormity of the shrine’s forest caught me by surprise. I was expecting modest trees, like those in the park around it. Instead, it was as if I had walked into a scene from Princess Mononoke.</Paragraph>
          </ParagraphContainer>
        </div>
        <div id="tokyo-urban">
          <div className="mw8 center">
            <div className="pa3-m"><PostImage srcId="L1030990" alt="Street-crossing near Shibuya station" width={2400} height={1600} /></div>
          </div>
          <ParagraphContainer>
            <Paragraph>Hit up a few of the main neighbourhoods: Shinjuku, Harakuju, and walked around near the Shibuya crossing.</Paragraph>
          </ParagraphContainer>
          <div className="mw6 center">
            <div className="pa3"><PostImage srcId="IMG_74AE36468063" alt="Raised guides on the streets of Tokyo" width={1200} height={1600} /></div>
          </div>
          <ParagraphContainer>
            <Paragraph>These yellow raised tracks were on most sidewalks, and served to both divide traffic and help guide people with visual impairments. Clever.</Paragraph>
          </ParagraphContainer>
          <div className="f-m mw8 center">
            <div className="w-third-m pa3"><PostImage srcId="L1030519" alt="A “G” stenciled onto the streets of Tokyo" /></div>
            <div className="w-third-m pa3"><PostImage srcId="L1020219" alt="A “D” stenciled onto the streets of Tokyo" /></div>
            <div className="w-third-m pa3"><PostImage srcId="L1020211" alt="A “G” stenciled onto the streets of Tokyo" /></div>
          </div>
          <ParagraphContainer>
            <Paragraph>Not sure what these letters marked on the street were.<br />Snapped a few different ones though.</Paragraph>
          </ParagraphContainer>
        </div>
        <div id="tokyo-trains">
          <div className="mw6 center">
            <div className="pa3-m"><PostImage srcId="L1020570" alt="Passing train near Yoyogi-koen station" width={1200} height={1800} /></div>
          </div>
          <ParagraphContainer>
            <Paragraph>As compact as the city was, the train system makes exploring really easy. Everything was walkable from the nearest station. Only downside was you sometimes needed different tickets to ride trains from different companies.</Paragraph>
          </ParagraphContainer>
          <div className="mw6 center">
            <div className="pa3"><PostImage srcId="L1020579" alt="Train station exit indicators" width={1200} height={800} /></div>
          </div>
          <ParagraphContainer>
            <Paragraph>Subway trains showed the station exits relative to your train car as you were arriving. A nice little detail.</Paragraph>
          </ParagraphContainer>
        </div>
        <div id="tokyo-gardens">
          <ParagraphContainer>
            <Paragraph>Wandering around Shinjuku, I stumbled across the Gyoen National Gardens. Lots of flowers, and they also had a lovely greenhouse.</Paragraph>
          </ParagraphContainer>

          <div className="f f-align-start mw7 center">
            <div className="w-50">
              <div className="pa2 pa3-m"><PostImage srcId="L1020319" alt="The Gyoen National Garden’s greenhouse" width={1200} height={1800} /></div>
              <div className="pa2 pa3-m"><PostImage srcId="L1020343" alt="Succulents at the Gyoen National Garden greenhouse" width={1200} height={1800} /></div>
            </div>
            <div className="w-50">
              <div className="pa2 pa3-m"><PostImage srcId="L1020344" alt="Cacti at the Gyoen National Garden greenhouse" width={1200} height={800} /></div>
              <div className="pa2 pa3-m"><PostImage srcId="L1020333" alt="Cavendish bananas at the Gyoen National Garden’s greenhouse" width={1200} height={1800} /></div>
            </div>
          </div>

          <ParagraphContainer>
            <Paragraph>While visiting the gardens I walked by an elderly man standing near some bushes. As I passed him, he plucked a handful of leaves, crammed them into his pockets, and briskly walked off.</Paragraph>
            <Paragraph>Old people are the best.</Paragraph>
          </ParagraphContainer>
        </div>
        <div id="tokyo-design-sight">
          <div className="mw6 center">
            <PostImage srcId="L1020508" alt="The 21_21 Design Sight building" />
          </div>

          <ParagraphContainer>
            <Paragraph>The 21_21 Design Sight gallery was another Tokyo highlight.</Paragraph>
          </ParagraphContainer>

          <div className="f mw7 center">
            <div className="w-50 pa2 pa3-m"><PostImage srcId="L1020530" alt="" width={1200} height={1800} /></div>
            <div className="w-50 pa2 pa3-m"><PostImage srcId="L1020531" alt="" width={1200} height={1800} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>The lobby and store are on ground-level, but most of the gallery actually sits underground.</Paragraph>
            <Paragraph>The exhibition on display was about athletes. It was a mix of work from photographer <Link href="https://www.google.com/search?q=adam+pretty+photography">Adam Pretty</Link> alongside some interactive displays.</Paragraph>
          </ParagraphContainer>

          <div className="mw5 center">
            <div className="pa3"><PostVideo srcId="21-21-design-sight" withAudio width={1080} height={1920} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>I think I was most impressed by the sound design on the interactive pieces: the running of the figures, the explorations of <em>kiai</em> (yells and grunts in sports). Things like that are sometimes forgotten in a gallery of visual works.</Paragraph>
          </ParagraphContainer>

          <div className="mw7 center">
            <PostImage srcId="L1020402" alt="Streets of Shibuya" width={2400} height={1600} />
          </div>
        </div>
      </section>
      <div className="ta-center mv5 mv6-m">
        {/* TOOD: Maybe a nice graphic squiggle, or a night-to-day illustration? */}
        <Divider type="travel" />
      </div>
      <section id="kyoto">
        <div id="kyoto-intro">
          <ParagraphContainer>
            <Paragraph>On Thursday I caught the Shinkansen (bullet train) over to <UnderlineText type="kyoto">Kyoto</UnderlineText>.</Paragraph>
          </ParagraphContainer>

          <div className="mw8 center">
            <div className="pa3-m"><PostVideo srcId="shinkansen" alt="Shinkansen" width={1280} height={720} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>The train system is crazy efficient. Tokyo to Kyoto (about 450km) takes only 3 hours, and arrives exactly on schedule.</Paragraph>
            <Paragraph>I bought a JR Rail Pass, which gives you unlimited travel on the Shinkansen and some local trains. A little pricey, but since I was planning on the fly, having that flexibility was really nice.</Paragraph>
          </ParagraphContainer>

          <ParagraphContainer>
            <Paragraph>I found out conductors and attendants use a technique called <Link href="http://www.atlasobscura.com/articles/pointing-and-calling-japan-trains" external>“Pointing-and-calling”</Link>:</Paragraph>
            <div className="pv2">
              <Blockquote>
                When train drivers wish to perform a required speed check, they do not simply glance at a display. Rather, the speedometer will be physically pointed at, with a call of “speed check, 80”—confirming the action taking place, and audibly confirming the correct speed.
                While these might strike visitors as silly, the movements and shouts … reduce workplace errors by up to 85 percent.
              </Blockquote>
            </div>
            <Paragraph>
              The New York Transit Authority adopted the “point” part of the system, which <Link href="https://www.youtube.com/watch?v=i9jIsxQNz0M" external>people have played with</Link> before.
            </Paragraph>
          </ParagraphContainer>
        </div>
        <div id="kyoto-nine-hours">
          <div className="mw7 center">
            <div className="pa3"><PostImage srcId="L1020696" alt="Entrance to 9hours Kyoto" width={2400} height={1600} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>In Kyoto I stayed at the <Link href="https://ninehours.co.jp/en/kyoto/" external>9hours capsule hotel</Link>.</Paragraph>
            <Paragraph>Apparently capsule hotels started as a cheap place to stay for people who were too drunk to make it home, but they’ve since become popular with backpackers and young travellers.</Paragraph>
          </ParagraphContainer>

          <div className="f-m mw8 center">
            <div className="w-50-m pa3"><PostImage srcId="IMG_1855" alt="Men's locker room" width={1200} height={1600} /></div>
            <div className="w-50-m pa3"><PostImage srcId="IMG_1856" alt="QR code locker system" width={1200} height={1600} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>When you arrive, you’re assigned a locker to keep your stuff. You can hang out in some of the shared spaces, but, for the most part, you’re just there to sleep.</Paragraph>
          </ParagraphContainer>

          <div className="f-m mw8 center">
            <div className="w-50-m pa3"><PostImage srcId="IMG_1862" alt="Capsule beds" width={1200} height={1600} /></div>
            <div className="w-50-m pa3"><PostImage srcId="IMG_1864" alt="Detailed view of capsule beds" width={1200} height={1600} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>I was a little worried my 6&#39;2&quot; frame wouldn’t fit, but it was actually pretty comfy.</Paragraph>
            <Paragraph>Each unit was outfitted with a dimmable light system that worked like an alarm clock: you set the time, and it’d slowly wake you up by filling the capsule with light.</Paragraph>
            <Paragraph>And for $25/night, I’d definitely visit again.</Paragraph>
          </ParagraphContainer>
        </div>
        <div className="ta-center mv5 mv6-m">
          <Divider type="sleep" />
        </div>
        <div id="kyoto-arashiyama">
          <ParagraphContainer>
            <Paragraph>The next day I woke up early to check out Arashiyama, a neighbourhood of Kyoto known for it’s bamboo forest and monkey park.</Paragraph>
            <Paragraph>But &ndash; silly me &ndash; I showed up a few hours before it opened. So I snapped some photos of some nearby rocks and light instead.</Paragraph>
          </ParagraphContainer>

          <div className="f mw8 center">
            {/* NOTE: this would be a good spot for an image grid, to mix it up from the "two-vertical photos" flow going on */}
            <div className="w-50 pa2 pa3-m"><PostImage srcId="L1020740" alt="" width={1200} height={1800} /></div>
            <div className="w-50 pa2 pa3-m"><PostImage srcId="L1020744" alt="" width={1200} height={1800} /></div>
          </div>
          <div className="mw8 center">
            <div className="pa2 pa3-m"><PostImage srcId="L1020768" alt="A sign at the Arashiyama monkey park" width={2400} height={1600} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>The monkeys were pretty fun too. Fed them some apples and moved on.</Paragraph>
          </ParagraphContainer>

          <ParagraphContainer>
            <Paragraph>Found a cozy café in the Arashiyama neighbourhood called <em>% Arabica</em>. It was a standard third-wave coffee kinda place, but it made for some nice photos.</Paragraph>
          </ParagraphContainer>

          <div className="mw8 center">
            <div className="pa2 pa3-m"><PostImage srcId="L1020765" alt="% Arabica in Arashiyama" width={2400} height={1600} /></div>
          </div>
          <div className="f mw8 center">
            {/* NOTE: this would be a good spot for an image grid, to mix it up from the "two-vertical photos" flow going on */}
            <div className="w-50-m pa2 pa3-m"><PostImage srcId="L1020757" alt="Barista at % Arabica" width={1200} height={1800} /></div>
            <div className="w-50-m pa2 pa3-m"><PostImage srcId="L1020758" alt="Baguette sandwiches at % Arabica" width={1200} height={1800} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>Spent the rest of the day visiting the Gion neighbourhood and checking out a couple of the shrines in the city.</Paragraph>
          </ParagraphContainer>

          <div className="f-m f-wrap mw7 center">
            <div className="w-50-m pa3"><PostImage srcId="L1020823" alt="Flower shop in Gion" width={1200} height={800} /></div>
            <div className="w-50-m pa3"><PostImage srcId="L1020919" alt="Gion neighbourhood" width={1200} height={800} /></div>
            <div className="w-100-m pa3"><PostImage srcId="L1020920" alt="Yasaka shrine" width={2400} height={1600} /></div>
          </div>
        </div>
      </section>
      <div className="ta-center mv5 mv6-m">
        <Divider type="sleep" />
      </div>
      <section id="takamatsu">
        <div id="takamatsu-kobe">
          <ParagraphContainer>
            <Paragraph>The following morning I caught a train heading westward.</Paragraph>
            <Paragraph>I stopped in Kobe for some Wagyu beef (mmm), and a look at the Hyogo Prefectural Art Museum.</Paragraph>
          </ParagraphContainer>

          <div className="mw7 center">
            <div className="pa3"><PostImage srcId="L1020991" alt="Staircase at the Hyogo Prefectural Art Museum" width={2400} height={1600} /></div>
            <div className="f-m">
              <div className="w-50-m pa3"><PostImage srcId="L1030019" alt="Waterfront view of the Hyogo Prefectural Art Museum" width={1200} height={800} /></div>
              <div className="w-50-m pa3"><PostImage srcId="L1030011" alt="Staircase at the Hyogo Prefectural Art Museum" width={1200} height={800} /></div>
            </div>
          </div>

          <ParagraphContainer>
            <Paragraph>Good look.</Paragraph>
            <Paragraph>I continued on to <UnderlineText type="takamatsu">Takamatsu</UnderlineText>.</Paragraph>
          </ParagraphContainer>

          <div className="mw8 center">
            <div className="pa3"><PostImage srcId="L1030063" alt="The train ride to Takamatsu" width={2400} height={1600} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>Takamatsu is primarily a port city, but has grown a lot since the opening of the nearby <Link href="https://en.wikipedia.org/wiki/Great_Seto_Bridge" external>Seto-Ohashi bridge</Link> that connects the mainland (Honshu) with Takamatsu’s island (Shikoku).</Paragraph>
          </ParagraphContainer>

          <div className="mw7 center"><div className="pa2 pa3-m"><PostImage srcId="L1030118" alt="" width={2400} height={1600} /></div></div>
          <div className="f mw7 center">
            <div className="w-50 pa2 pa3-m"><PostImage srcId="L1030135" alt="" width={1200} height={1800} /></div>
            <div className="w-50 pa2 pa3-m"><PostImage srcId="L1030144" alt="" width={1200} height={1800} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>Takamatsu’s prefecture is known for it’s firm and chewy udon. Can confirm, I had some great udon here. (It was also served super hot and I scalded my tongue like never before trying to slurp it up.)</Paragraph>
          </ParagraphContainer>
        </div>
        <div id="takamatsu-naoshima">
          <ParagraphContainer>
            <Paragraph>Besides the udon, my main reason for coming to Takamatsu was actually to visit the nearby island of <UnderlineText type="naoshima">Naoshima</UnderlineText>: home to some beautiful landscapes, architecture, and <Link href="http://benesse-artsite.jp/en/">amazing art galleries</Link>.</Paragraph>
          </ParagraphContainer>

          <div className="mw8 center mv4-m pa3">
            <PostVideo srcId="ferry-naoshima" alt="Ferry ride to Naoshima" width={1920} height={1080} />
          </div>

          <ParagraphContainer>
            <Paragraph>I caught the first ferry out.</Paragraph>
          </ParagraphContainer>

          <div className="mw7 center">
            <div className="pa2 pa3-m"><PostImage srcId="L1030236" alt="" width={2400} height={1600} /></div>
            <div className="f">
              <div className="w-50 pa2 pa3-m"><PostImage srcId="L1030241" alt="" width={1200} height={800} /></div>
              <div className="w-50 pa2 pa3-m"><PostImage srcId="L1030240" alt="" width={1200} height={800} /></div>
            </div>
          </div>

          <ParagraphContainer>
            <Paragraph>Renting a bike and cycling around is the preferred way to visit the island, but it was so nice out that I decided to walk.</Paragraph>
          </ParagraphContainer>

          <div className="f mw7 center">
            <div className="pa3"><PostImage srcId="L1030258" alt="Road leading to the Benesse Art Area on Naoshima" width={2400} height={1600} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>Tadao Ando was the architect for pretty much all the galleries on the island: Chichu, the Benesse House, the Lee Ufan museum, etc. There’s even a museum dedicated to Ando’s work which he, of course, also designed.</Paragraph>
            <Paragraph>Not every day you get to run free with a whole island.</Paragraph>
          </ParagraphContainer>

          <div className="f center">
            <div className="f f-column f-align-end w-50">
              <div className="pa2 pa3-m"><PostImage srcId="IMG_EDA93CB97772" alt="Tickets to the Chichu museum" width={1200} height={1600} /></div>
              <div className="pa2 pa3-m"><PostImage srcId="IMG_D2E22BB5EB5C" alt="Wall inside the Chichu museum" width={1200} height={1600} /></div>
            </div>
            <div className="f f-column f-align-start w-50">
              <div className="pa2 pa3-m"><PostImage srcId="IMG_A3A4328735D3" alt="Hallway inside the Chichu museum" width={1200} height={1600} /></div>
              <div className="pa2 pa3-m"><PostImage srcId="IMG_45D28F3BC130" alt="View from the Benesse house" width={1200} height={1600} /></div>
            </div>
          </div>

          <ParagraphContainer>
            <Paragraph>The Chichu museum was gorgeous.</Paragraph>
            <Paragraph>The building was designed around the work of three specific artists: Monet, Walter di Maria, and James Turrell. The shape and lighting of each room is arranged to show those works in the best possible way.</Paragraph>
            <Paragraph>Pictures weren’t allowed (I snuck these anyways 🙈), but you can also <Link href="https://www.google.com/search?q=chichu+art+museum&tbm=isch" external>find some on zee webs</Link>.</Paragraph>
          </ParagraphContainer>

          <div className="mw6 center pa3"><PostImage srcId="IMG_C0A619B76C4F" alt="Walking back to Naoshima ferry port" width={1200} height={900} /></div>

          <ParagraphContainer>
            <Paragraph>I regretted my decision to not rent a bike on the long walk back after standing in art galleries for hours.</Paragraph>
            <Paragraph>Took a hard nap on the ferry ride back, haha.</Paragraph>
          </ParagraphContainer>

          <div className="mw7 center pa3">
            <PostImage srcId="L1030299" alt="Busshozan onsen in Takamatsu" width={1200} height={800} />
          </div>

          <ParagraphContainer>
            <Paragraph>That night in Takamatsu, I visited <Link href="http://busshozan.com" external>Busshozan</Link>, a local onsen (hot springs), which hit the spot.</Paragraph>
          </ParagraphContainer>

          <div className="mw6 center pa3"><PostImage srcId="IMG_47D347ADF812" alt="Interior of Busshozan onsen" width={1200} height={1600} /></div>
        </div>
      </section>
      <div className="ta-center mv5 mv6-m">
        <Divider type="sleep" />
      </div>
      <section id="nara">
        <div id="nara-train">
          <ParagraphContainer>
            <Paragraph>The city of <UnderlineText type="nara">Nara</UnderlineText> was next on my list.</Paragraph>
          </ParagraphContainer>
        </div>
        <div id="nara-deer-and-kids">
          <div className="mw7 center">
            <div className="pa2 pa3-m"><PostImage srcId="L1030408" alt="A deer standing amongst a bunch of students" width={1200} height={800} /></div>
            <div className="f">
              <div className="w-50 pa2 pa3-m"><PostImage srcId="L1030420" alt="Fashion fawn in Nara" width={1200} height={800} /></div>
              <div className="w-50 pa2 pa3-m center"><PostImage srcId="L1030424" alt="School children from Nara in their uniforms" width={1200} height={800} /></div>
            </div>
          </div>

          <ParagraphContainer>
            <Paragraph>The deer and the school kids were out in full force the day I arrived.</Paragraph>
          </ParagraphContainer>

          <div className="mw7 center pa3"><PostImage srcId="L1030390" alt="Deer swarming a cracker saleslady" width={1200} height={800} /></div>

          <ParagraphContainer>
            <Paragraph>There were vendors selling crackers to feed the deer, who get sneaky when you’re not looking.</Paragraph>
          </ParagraphContainer>

          {/* Would be fun to get a heart emoji/sticker in here. */}
          <div className="mw5 center pa3"><PostImage srcId="IMG_379792D4C681" alt="❤" width={1200} height={1600} /></div>

          <ParagraphContainer>
            <Paragraph>Also, got low-key interviewed for a couple school projects.</Paragraph>
          </ParagraphContainer>
        </div>
        <div id="nara-sashimi">
          {/* Would be great to put an illustration here of some kind. BRUTUS-style, y'know? */}
          {/* Would be cool to have a few hand-drawn fish floating around */}
          {/* <div className="pa5 bg-yellow">
            <Paragraph>I had some amazing sashimi here in Nara. A little unexpected, given that Nara isn’t on the coast.</Paragraph>
            <Paragraph>The place was run by a friendly old man and his wife.</Paragraph>
            <Paragraph>It was as hole-in-the-wall as they come; next to the beer glasses was his open bag of milk candies, and the cabbage for the lunch sets sat on top of the accounting papers.</Paragraph>
            <Paragraph>As people came in and ordered, he’d take homemade pickles from a Tupperware container tucked under the counter, then slice up some tuna from beside the radio that was playing a Japanese talk show.</Paragraph>
            <Paragraph>And man, was that tuna good.</Paragraph>
          </div> */}
        </div>
        <div id="nara-osaka">
          <ParagraphContainer>
            <Paragraph>One evening, I made a quick trip to <UnderlineText type="osaka">Osaka</UnderlineText>. Didn’t see much other than some big malls and long lines for takoyaki. I’ll give it a better chance next time.</Paragraph>
          </ParagraphContainer>
        </div>
      </section>
      <div className="ta-center mv5 mv6-m">
        <Divider type="travel" />
      </div>
      <section id="tokyo-part-2">
        <div id="tokyo-tim-hecker">
          <ParagraphContainer>
            {/* Otherwise, mostly just checking out some bookstores and eating lots of noodles */}
            <Paragraph>I caught a train back to <UnderlineText type="tokyo-2">Tokyo</UnderlineText> for the last few days of my trip.</Paragraph>
            <Paragraph>Back when I first arrived in Japan, I saw a poster for a <Link href="https://www.youtube.com/watch?v=Cu-ihs4BkAs" external>Tim Hecker</Link> show in Tokyo. I’d wanted to see him for a while, so I grabbed a ticket.</Paragraph>
          </ParagraphContainer>

          {/* NOTE: maybe this section could be black? */}
          {/* TODO: video with audio */}
          <div className="mw7 center">
            <div className="pa3"><PostVideo srcId="tim-hecker" alt="Tim Hecker at WWW X" withAudio /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>There were no visuals to accompany the music &mdash; I never even saw Mr. Hecker. Just 45 minutes of pitch black sonic ambience.</Paragraph>
          </ParagraphContainer>

          <div className="mw5 center">
            <div className="pa3"><PostImage srcId="L1030546" alt="" /></div>
            <div className="pa3"><PostImage srcId="L1030548" alt="WWW X signage" width={1200} height={1800} /></div>
          </div>
        </div>
        <div id="tokyo-muji">
          <ParagraphContainer>
            <Paragraph>I also got to visit my favourite line of stores: <Link href="http://www.muji.com/us/feature/whatismuji/" external>MUJI</Link>. The one in Ginza was my favourite. It had a books, clothing, home renovation consultants, packaged food, packaged plants, and, best of all: a full café with delicious food.</Paragraph>
          </ParagraphContainer>

          <div className="f f-wrap mw7 center">
            <div className="w-50 w-third-m">
              <div className="pa2 pa3-m"><PostImage srcId="IMG_0B9A1B60AB4E" width={1200} height={900} /></div>
              <div className="pa2 pa3-m"><PostImage srcId="L1020658" width={1200} height={1800} /></div>
              <div className="d-none-m pa2 pa3-m"><PostImage srcId="L1020310" width={1200} height={1800} /></div>
            </div>
            <div className="w-50 w-third-m">
              <div className="pa2 pa3-m"><PostImage srcId="IMG_28D167ADCAA6" width={1200} height={1601} /></div>
              <div className="pa2 pa3-m"><PostImage srcId="IMG_A4E15AF68A79" width={1200} height={1601} /></div>
              <div className="d-none-m pa2 pa3-m"><PostImage srcId="IMG_30F8EA6A3C9B" width={1200} height={900} /></div>
            </div>
            <div className="d-none d-block-m w-50 w-third-m">
              <div className="pa2 pa3-m"><PostImage srcId="L1020310" width={1200} height={1800} /></div>
              <div className="pa2 pa3-m"><PostImage srcId="IMG_30F8EA6A3C9B" width={1200} height={900} /></div>
            </div>
          </div>

          <ParagraphContainer>
            <Paragraph>My goodness, I could live in that store I love it so much.</Paragraph>
          </ParagraphContainer>
        </div>
        <div className="ta-center mv5 mv6-m">
          <Divider type="travel" />
        </div>
        <div id="tokyo-hakone">
          <ParagraphContainer>
            <Paragraph>Next day I went to <UnderlineText type="hakone">Hakone</UnderlineText> to check out the Open Air Museum.</Paragraph>
            <Paragraph>The town was so beautiful &mdash; a village nestled into the mountains. A friend recommended I do the <Link href="http://www.japan-guide.com/e/e5210.html">Hakone Round Course</Link>. I didn’t think I’d have the time, but I regret not doing it.</Paragraph>
          </ParagraphContainer>
          <div className="mw8 center">
            <div className="pa3"><PostImage srcId="L1030710" alt="A train passing by the tracks in Hakone" width={2400} height={1600} /></div>
          </div>
          <ParagraphContainer>
            <Paragraph>The Open Air Museum was also great, though at this point in the trip I had been to so many art galleries that I felt a bit like this guy:</Paragraph>
          </ParagraphContainer>
          <div className="mw5 center">
            <div className="pa3"><PostImage srcId="IMG_45377DBB27FE" alt="Man with face in the ground from Hakone Open Air Museum" width={1200} height={1600} /></div>
          </div>
        </div>
        <div className="ta-center mv5 mv6-m">
          <Divider type="travel" />
        </div>
        <div id="tokyo-kagawara">
          <ParagraphContainer>
            <Paragraph>My last day-trip was to a small beach town south of Tokyo called <UnderlineText type="kamakura">Kamakura</UnderlineText>.</Paragraph>
            <Paragraph>I checked out some shrines and stores. A few notes:</Paragraph>
            <ul>
              <li>The <em>Kamaage Shirasu Donabe</em> at <Link href="https://goo.gl/maps/YJnT9DNMZBv" external>this restaurant</Link> was just too good</li>
              <li>One restaurant had a sample of some pink jelly they serve sitting outside. Beside it was a sign, which I think it said something like “touch me!” A lady walking by gave it a pat, then shrieked back with an “OH!” as it jiggled</li>
              <li>Yuzu soda is the best</li>
            </ul>
          </ParagraphContainer>

          <div className="mw7 center">
            <div className="pa3"><PostImage srcId="L1040091" alt="Kamakura beach" width={1200} height={800} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>Almost every evening on the trip I turned into a mad man, sprinting around snapping photos, trying to capture the <Link href="https://en.wikipedia.org/wiki/Blue_hour" external>blue hour</Link> light.</Paragraph>
          </ParagraphContainer>

          <div className="f mw8 center">
            <div className="w-50 pa2 pa3-m"><PostImage srcId="L1040111" alt="A tiny van" width={1200} height={800} /></div>
            <div className="w-50 pa2 pa3-m"><PostImage srcId="L1040128" alt="" width={1200} height={800} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>Ended the day with a visit to an onsen. The water was a deep black, like the sand on the nearby beach. Craziness.</Paragraph>
          </ParagraphContainer>

          <div className="mw5 center">
            <div className="pa3"><PostImage srcId="L1040153" alt="Inamuragasaki beach" width={1200} height={1800} /></div>
          </div>
        </div>
        <div className="ta-center mv5 mv6-m">
          <Divider type="sleep" />
        </div>
        <div id="tokyo-tower">
          <ParagraphContainer>
            <Paragraph>I took the last few days easy, visiting bookstores and eating lots of noodles. Also visited a bunch of neat buildings in Tokyo: Omotesando Hills, the Nakagin Capsule Tower, and, of course, the Tokyo Tower.</Paragraph>
          </ParagraphContainer>

          <div className="mw5 center">
            <div className="pa3"><PostImage srcId="L1030901" alt="Looking at a phone at Mori Tower" width={1200} height={1800} /></div>
            {/* <div className="f">
              <div className="w-third pa3"><PostImage srcId="L1030904" alt="Someone taking photos of Tokyo Tower" width={1200} height={800} /></div>
              <div className="w-two-thirds pa3"><PostImage srcId="L1030915" alt="Someone taking photos of Tokyo Tower" width={1200} height={800} /></div>
            </div> */}
          </div>

          <div className="mw8 center">
            <div className="pa3"><PostImage srcId="L1030941" sizes={[1200, 2400]} alt="Goodbye Tokyo" width={2400} height={1600} /></div>
          </div>

          <ParagraphContainer>
            <Paragraph>Pretty much it. I filled myself with melonpan and caffeine at the airport, then caught my flight back home.</Paragraph>
          </ParagraphContainer>

          <div className="pv3 center mw3">
            <img className="us-none" src={utils.getAssetUrl('2017/japan/v.svg')} alt="✌️" />
          </div>
        </div>
      </section>
    </main>
    <EndNotes id="endnotes">
      <div className="mw5 w-80 center pv4 pv5-m">
        <p>Thanks to <Link href="https://twitter.com/h_annahlee" external>Hannah</Link> and to <Link href="https://twitter.com/emmersonic" external>Taylor</Link> for their recommendations, and <Link href="https://twitter.com/kvng" external>Kevin</Link> and <Link href="https://twitter.com/spglco" external>Wayne</Link> for their amazing Foursquare lists. Also, props to <Link href="http://jon-kyle.com" external>Jon-Kyle Mohr</Link> whose trip summary I relentlessly copied for my own itinerary and site.</p>
        <p>And thanks to you for reading! You can also check out <Link href="https://rosszurowski.com/100">my 100 days project</Link> for more photos.</p>
      </div>
    </EndNotes>
  </div>
);

export default JapanTripPage;
