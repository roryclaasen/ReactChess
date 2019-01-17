/* eslint no-console: 0 */

const express = require('express');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get([
	'/',
	'/play'
], (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/license', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'LICENSE.md'));
});

server.listen(port, () => {
	console.log('Serve listening on *:%d', port);
});

module.exports = app;
