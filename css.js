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
    sans: '-apple-system, BlinkMacSystemFont, Arial, sans-serif',
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
    bold: 500,
  },
  lineHeight: {
    '1.7': 1.7,
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
    540: '540px',
    900: '900px',
    1200: '1200px',
    '100%': '100%'
  },
  spacing: [0, 4, 8, 16, 32, 64, 128],
}), breakpoints);

const global = `
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.h-fade {
  transition: opacity 200ms ease;
}

.h-fade:hover {
  opacity: 0.7;
}
`;

const styles = [vanilla, global, fcss].join('\n');

console.log(csso.minify(styles).css);
