/* eslint no-console: 0 */

const express = require('express');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);

const root = path.join(__dirname, '..', '..');

app.use(express.static(path.join(root, 'build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(root, 'build', 'index.html'));
});

app.get('/license', (req, res) => {
	res.sendFile(path.join(root, 'LICENSE'));
});

server.listen(port, () => {
	console.log('Serve listening on *:%d', port);
});

module.exports = app;
