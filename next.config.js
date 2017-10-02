const fs = require('mz/fs');
const assign = require('object.assign');

const stripExtension = str => str.replace(/\.js$/, '');
const pathsToPages = paths => paths.reduce(
  (pages, path) => assign({}, pages, { [path]: { page: path } }),
  {},
);

const getLogPaths = async () => {
  const entries = await fs.readdir('./pages/log');
  return entries
    .map(stripExtension)
    .map(path => `/log/${path}`)
}

module.exports = {
  exportPathMap () {
    const staticPaths = [
      '/',
      '/2017/japan',
      '/100',
      '/_error',
    ];

    return getLogPaths().then(logPaths => {
      const paths = staticPaths.concat(logPaths);
      const pathMap = pathsToPages(paths);

      return Promise.resolve(pathMap);
    });
  },
};
