/* eslint no-console: 0 */

import express from 'express';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io';

import GameManager from './games/manager';

const port = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const root = path.join(__dirname, '..', '..');

const gameManager = new GameManager();

gameManager.newGame();

app.use(express.static(path.join(root, 'build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(root, 'build', 'index.html'));
});

app.get('/license', (req, res) => {
	res.sendFile(path.join(root, 'LICENSE'));
});

io.on('connection', (socket) => {
	// TODO Implement server stuff
	console.log(socket);
});

server.listen(port, () => {
	console.log('Serve listening on *:%d', port);
});

module.exports = app;
