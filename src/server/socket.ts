import { Socket } from 'socket.io';

import GameManager from './games/manager';
import { global, lobby } from '../shared/socket.commands';

const gameManager = new GameManager();

const request = (
	socket: Socket,
	event: string,
	method: (data?: any, fn?: Function) => void
) => socket.on(event, (data, fn) => {
	try {
		method(data, fn);
	} catch (e) {
		console.error(`Error processing request '${event}'`);
		console.error(e);
		fn({
			data,
			event,
			error: 'Error processing request',
			stack: e
		});
	}
});

export function handler(socket: Socket) {
	let token: string;
	request(socket, global.disconnect, () => {
		if (gameManager.isInGame(socket.id) || token) {
			gameManager.getGame(token).removePlayer(socket.id);
		}
		if (!gameManager.getGame(token).playable) {
			// TODO Send notification to other players
		}
		if (gameManager.getGame(token).players.length === 0) {
			gameManager.removeGame(token);
		}
	});

	request(socket, lobby.make, (data, fn) => {
		if (token) {
			if (gameManager.isInGame(socket.id)) {
				gameManager.getGame(token).removePlayer(socket.id);
			}
		}
		const game = gameManager.newGame({
			id: socket.id
		});
		token = game.token;
		fn(game.write());
	});

	request(socket, lobby.join, (data, fn) => {
		if (token) {
			if (gameManager.isInGame(socket.id)) {
				gameManager.getGame(token).removePlayer(socket.id);
			}
		}

		if (gameManager.hasGame(data.token)) {
			const game = gameManager.joinGame(data.token, {
				id: socket.id
			});
			token = game.token;
			fn(game.write());
		}
		fn({
			data,
			event: lobby.join,
			error: 'No Game exists with this token'
		});
	});

	request(socket, lobby.leave, (data, fn) => {
		gameManager.getGame(token).removePlayer(socket.id);
		// TODO Update all other players in the game
		token = undefined;
	});

	// TODO Implement server stuff
	console.log(socket);
}
