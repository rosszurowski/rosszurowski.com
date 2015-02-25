/**
 * Configuration variables for the site
 */

var join = require('path').join;

const PORT = exports.PORT = process.env.PORT || 8080;
const ENV = exports.ENV = process.env.NODE_ENV || 'development';

const SOCKET_PORT = exports.SOCKET_PORT = PORT + 1;

GLOBAL.__root     = require('app-root-path').path;
GLOBAL.__public   = join(__root,    'public');
GLOBAL.__content  = join(__root,    'content');
GLOBAL.__shared   = join(__content, '_shared.yml');
GLOBAL.__views    = join(__root,    'views');