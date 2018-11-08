import { Socket } from 'socket.io';

import GameManager from './games/manager';
import { global, lobby } from '../shared/socket.commands';

const gameManager = new GameManager();

export function handler(socket: Socket) {
	let token: string;
	socket.on(global.disconnect, () => {
		// TODO Handle game removed
	});

	socket.on(lobby.make, (fn: Function) => {
		try {
			if (token) {
				// TODO Leave old game
				// something like this
				// gameManager.leaveGame(token, socket.io);
			}
			const game = gameManager.newGame({
				id: socket.id
			});
			token = game.token;
			fn(game);
		} catch (e) {
			console.error(e);
			fn({
				error: 'Error processing request'
			});
		}
	});

	socket.on(lobby.join, (options, fn: Function) => {
		try {
			if (token) {
				// TODO Leave old game
				// something like this
				// gameManager.leaveGame(token, socket.io);
			}

			if (gameManager.hasGame(options.token)) {
				const game = gameManager.joinGame(options.token, {
					id: socket.id
				});
				token = game.token;
				fn(game);
			}
			fn({
				options,
				error: 'No Game exists with this token'
			});
		} catch (e) {
			console.error(e);
			fn({
				options,
				error: 'Error processing request'
			});
		}
	});

	// TODO Implement server stuff
	console.log(socket);
}
