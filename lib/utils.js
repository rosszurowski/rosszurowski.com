import tinytime from 'tinytime';
import config from 'lib/config';

const formatPostTimestamp = tinytime('{MMMM} {DD}, {YYYY}').render;

export default {
  getAssetUrl: id => `${config.ASSET_HOST}/${id}`,
  formatPostTimestamp,
};
