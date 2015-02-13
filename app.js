/**
 * Module dependencies
 */
import http from 'http';
import koa from 'koala';

import router from './lib/router';
import socket from './lib/socket';

export default var app = koa();

app.use(router());
app.get('/')
app.sock('/live', socket);


http.createServer(app.callback()).listen(8080);