import tinytime from 'tinytime';
import config from 'lib/config';

export default {
  getAssetUrl: id => `${config.ASSET_HOST}/${id}`,
  formatPostTimestamp: tinytime('{MMMM} {DD}, {YYYY}').render,
};
