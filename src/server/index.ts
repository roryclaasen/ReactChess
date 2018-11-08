import express from 'express';
import path from 'path';
import http from 'http';
import socketIo, { Socket } from 'socket.io';

import GameManager from './games/manager';
import { global, lobby } from '../shared/socket.commands';

const port = process.env.PORT || 3000;

const app = express();
const server = new http.Server(app);
const io = socketIo(server);

const root = path.join(__dirname, '..', '..');

const gameManager = new GameManager();

app.use(express.static(path.join(root, 'build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(root, 'build', 'index.html'));
});

app.get('/license', (req, res) => {
	res.sendFile(path.join(root, 'LICENSE'));
});

io.on(global.connection, (socket: Socket) => {
	let token: string;
	socket.on(global.disconnect, () => {
		// TODO Handle game removed
	});

	socket.on(lobby.make, (fn: any) => {
		if (token) {
			// TODO Leave old game
			// something like this
			// gameManager.leaveGame(token, socket.io);
		}
		const game = gameManager.newGame();
		token = game.token;
		fn(game);
	});

	// TODO Implement server stuff
	console.log(socket);
});

server.listen(port, () => {
	console.log('Serve listening on *:%d', port);
});

module.exports = app;
