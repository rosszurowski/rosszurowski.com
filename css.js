const csso = require('csso');
const hibiscss = require('hibiscss').default;
const kit = require('hibiscss/default');
const vanilla = require('@rosszurowski/vanilla');

const breakpoints = {
  s: '479px',
};

const fcss = hibiscss(kit({
  colors: {
    pink: '#ffb7b3',
    black: '#141414',
    green: '#00bf83',
    lightGray: '#f2f2f2',
  },
  fontFamily: {
    sans: 'Calibre, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
    mono: 'SFMono-Regular, menlo, monaco, monospace',
  },
  fontSize: {
    13: '13px',
    15: '15px',
    18: '18px',
    22: '22px',
    27: '27px',
    33: '33px',
    72: '72px',
  },
  fontWeight: {
    light: 300,
    normal: 400,
  },
  letterSpacing: {
    1: '1px',
  },
  sizes: {
    '1': '1rem',
    '2': '2rem',
    '3': '3rem',
    '4': '4rem',
    '5': '5rem',
    '100%': '100%',
  },
  maxWidths: {
    500: '500px',
    900: '900px',
    1200: '1200px',
    '100%': '100%'
  },
  spacing: [0, 4, 8, 16, 32, 64, 128],
}), breakpoints);

const fontface = `
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

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
`;

const styles = [vanilla, fontface, fcss].join('\n');

console.log(csso.minify(styles).css);
