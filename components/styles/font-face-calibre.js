import React from 'react';

export default () => (
  <style jsx global>{`
    @font-face{
      font-family: Calibre;
      src:
        url(/static/fonts/CalibreWeb-Regular.woff) format('woff'),
        url(/static/fonts/CalibreWeb-Regular.woff2) format('woff2');
      font-weight: 400;
      font-style: normal;
    }

    @font-face{
      font-family: Calibre;
      src:
        url(/static/fonts/CalibreWeb-RegularItalic.woff) format('woff'),
        url(/static/fonts/CalibreWeb-RegularItalic.woff2) format('woff2');
      font-weight: 400;
      font-style: italic;
    }

    @font-face{
      font-family: Calibre;
      src:
        url(/static/fonts/CalibreWeb-Light.woff) format('woff'),
        url(/static/fonts/CalibreWeb-Light.woff2) format('woff2');
      font-weight: 200;
      font-style: normal;
    }

    @font-face{
      font-family: Calibre;
      src:
        url(/static/fonts/CalibreWeb-LightItalic.woff) format('woff'),
        url(/static/fonts/CalibreWeb-LightItalic.woff2) format('woff2');
      font-weight: 200;
      font-style: italic;
    }
  `}</style>
);
