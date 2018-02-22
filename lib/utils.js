import tinytime from 'tinytime';
import config from 'lib/config';

require('object.assign/polyfill')();

export default {
  getAssetUrl: id => `${config.ASSET_HOST}/${id}`,
  formatPostTimestamp: tinytime('{MMMM} {DD}, {YYYY}').render,
};
