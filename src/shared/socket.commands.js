const global = {
	connection: 'connection',
	disconnect: 'disconnect'
};

const lobby = {
	join: 'lobby.join',
	make: 'lobby.make',
	leave: 'lobby.leave',
	started: 'lobby.started'
};

const game = {
	started: lobby.started, // TODO might not use
	update: 'game.update',
	move: 'game.move'
};

const commands = {
	global,
	lobby,
	game
};

export default commands;

export { global };
export { lobby };
export { game };
