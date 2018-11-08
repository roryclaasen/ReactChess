import express from 'express';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io';

import { global } from '../shared/socket.commands';
import { handler as socketHandler } from './socket';

const port = process.env.PORT || 3000;

const app = express();
const server = new http.Server(app);
const io = socketIo(server);

const root = path.join(__dirname, '..', '..');

app.use(express.static(path.join(root, 'build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(root, 'build', 'index.html'));
});

app.get('/license', (req, res) => res.sendFile(path.join(root, 'LICENSE')));

io.on(global.connection, socketHandler);

server.listen(port, () => {
	console.log('Serve listening on *:%d', port);
});

module.exports = app;
