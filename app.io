require('colors')
require.extensions['.io'] =
require.extensions['.js'];

/**
 * Module dependencies
 */
var http = require('http');
var koa = require('koa');
var mount = require('koa-mount');
var serve = require('koa-static');

var pkg = require('./package');
var config = require('./lib/config');

var router = require('./lib/router');
var Socket = require('./lib/socket/server');

var app = koa();
app.use(router(app));

if (!module.parent) {
    http.createServer(app.callback()).listen(config.PORT);
}

/**
 * CLI interface for the server
 */
console.log(
    `\n${pkg.name} is running...`.green,
    `\nListening on http://localhost:${config.PORT}`,
    `\nEnvironment: ${config.ENV}`,
    `\nCtrl+C to shut down\n`.grey
);
process.on('SIGINT', function() {
    console.log(
        "\nServer has shutdown".red,
        "\nServer was running for",
        Math.round(process.uptime()),
        "seconds"
    );
    process.exit(0);
});

/**
 * Export server as a module
 */
module.exports = app;
