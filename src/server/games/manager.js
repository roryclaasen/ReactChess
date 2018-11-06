import OnlineBoard from './onlineBoard';

export default class GameManager {
	constructor() {
		this.games = {};
	}

	newToken = () => {
		let token;
		do {
			token = (Math.floor(Math.random() * 900000) + 100000).toString();
		} while (this.hasGame(token));
		return token;
	}

	newGame = (token = this.newToken()) => {
		this.games[token] = new OnlineBoard();
		return this.getGame(token);
	}

	hasGame = (token) => token in this.games;

	getGame = (token) => {
		if (this.hasGame(token)) {
			return this.games[token];
		}
		return undefined;
	}

	removeGame = (token) => delete this.games[token];
}
