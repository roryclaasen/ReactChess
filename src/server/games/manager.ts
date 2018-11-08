import OnlineBoard, { Player } from './onlineBoard';

interface Games {
	[key: string]: OnlineBoard;
}

export default class GameManager {

	private games: Games;

	constructor() {
		this.games = {};
	}

	private newToken(): string {
		let token;
		do {
			token = (Math.floor(Math.random() * 900000) + 100000).toString();
		} while (this.hasGame(token));
		return token;
	}

	public newGame(player: Player, token: string = this.newToken()): OnlineBoard {
		this.games[token] = new OnlineBoard(token, player);
		return this.getGame(token);
	}

	public joinGame(token: string, player: Player): OnlineBoard {
		this.games[token].addPlayer(player);
		return this.getGame(token);
	}

	public hasGame(token: string): boolean {
		return token in this.games;
	}

	public getGame(token: string): OnlineBoard {
		if (this.hasGame(token)) {
			return this.games[token];
		}
		return undefined;
	}

	public removeGame(token: string) {
		delete this.games[token];
	}
}
