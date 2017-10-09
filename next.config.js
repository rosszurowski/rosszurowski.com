const fs = require('mz/fs');

const stripExtension = str => str.replace(/\.js$/, '');
const pathsToPages = paths => paths.reduce((pages, path) => ({ ...pages, [path]: { page: path } }), {});

const getLogPaths = async () => {
  const entries = await fs.readdir('./pages/log');
  return entries.map(stripExtension).map(path => `/log/${path}`);
};

module.exports = {
  async exportPathMap() {
    const staticPaths = ['/', '/2017/japan', '/100'];
    const customPaths = {
      '/404.html': { page: '_redirect' },
    };

    const logPaths = await getLogPaths();

    const paths = staticPaths.concat(logPaths);
    const pathMap = { ...customPaths, ...pathsToPages(paths) };

    return pathMap;
  },
};
