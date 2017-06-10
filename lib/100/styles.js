
export const color = {
  green: '#00bf83',
  black: '#141414',
  gray: '#a0a0a0',
};

export const spacing = [
  `0`,
  `0.25rem`,
  `0.5rem`,
  `1rem`,
  `2rem`,
  `4rem`,
  `8rem`,
  '16rem',
];

export const font = {
  lineHeight: {
    normal: 1.5,
    loose: 1.7,
  },
  size: [
    `13px`,
    `14px`,
    `16px`,
    `19px`,
    `24px`,
    `36px`,
    `72px`,
  ],
  weight: {
    light: 300,
    normal: 400,
    bold: 600,
  },
};

export const media = {
  small: body => `@media only screen and (min-width: 479px) { ${body} }`,
  medium: body => `@media only screen and (min-width: 767px) { ${body} }`,
};
