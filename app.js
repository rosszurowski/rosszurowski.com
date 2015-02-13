/**
 * Module dependencies
 */

require('colors')

var http = require('http');

var koa = require('koala');
var mount = require('koa-mount');
var serve = require('koa-static');

var pkg = require('./package');
var config = require('./lib/config');
var Socket = require('./lib/socket');

var app = koa();
var socket = new Socket(config.SOCKET_PORT);

app.use(mount('/live', socket.callback()));
app.use(serve(__public));


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
    `\nCtrl+C to shut down`.grey
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