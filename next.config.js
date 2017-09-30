const fs = require('mz/fs');

const stripExtension = str => str.replace(/\.js$/, '');
const pathsToPages = paths => paths.reduce(
  (pages, path) => ({ ...pages, [path]: { page: path } }),
  {},
);

module.exports = {
  async exportPathMap () {
    const paths = [
      '/',
      '/2017/japan',
      '/100',
      '/_error',
    ];

    const logEntries = (await fs.readdir('./pages/log'))
      .map(stripExtension)
      .map(path => `/log/${path}`);

    paths.push(logEntries)

    return pathsToPages(paths);
  },
};
