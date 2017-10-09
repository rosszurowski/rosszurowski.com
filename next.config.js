const readdir = require('recursive-readdir');

const stripExtension = str => str.replace(/\.js$/, '');
const stripPagesPath = str => str.replace(/^pages/, '');
const pathsToPages = paths => paths.reduce((pages, path) => ({ ...pages, [path]: { page: path } }), {});

const getLogPaths = async () => {
  const entries = await readdir('./pages/log');
  return entries.map(stripExtension).map(stripPagesPath);
};

module.exports = {
  async exportPathMap() {
    const staticPaths = ['/', '/2017/japan', '/100'];

    const customPaths = {
      '/404.html': { page: '_redirect' },
    };

    const logPaths = await getLogPaths();
    const paths = staticPaths.concat(logPaths);

    const pathMap = { ...pathsToPages(paths), ...customPaths };

    return pathMap;
  },
};
