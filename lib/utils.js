import config from 'lib/config';

export default {
  getAssetUrl: id => `${config.ASSET_HOST}/${id}`,
};
