import OnlineBoard, { IPlayer } from './onlineBoard';

export default class GameManager {

	private games: Map<string, OnlineBoard>;

	constructor() {
		this.games = new Map<string, OnlineBoard>();
	}

	private newToken(): string {
		let token;
		do {
			token = (Math.floor(Math.random() * 900000) + 100000).toString();
		} while (this.hasGame(token));
		return token;
	}

	public newGame(player: IPlayer, token: string = this.newToken()): OnlineBoard {
		this.games.set(token, new OnlineBoard(token, player));
		return this.getGame(token);
	}

	public joinGame(token: string, player: IPlayer): OnlineBoard {
		this.games.get(token).addPlayer(player);
		return this.getGame(token);
	}

	public hasGame(token: string): boolean {
		return this.games.has(token);
	}

	public getGame(token: string): OnlineBoard {
		if (this.hasGame(token)) {
			return this.games.get(token);
		}
		return undefined;
	}

	public removeGame(token: string) {
		this.games.delete(token);
	}

	public isInGame(id: string) {
		this.games.forEach((game) => {
			const player = game.getPlayer(id);
			const spec = game.getSpectator(id);
			if (player || spec) return true;
		});
		return false;
	}
}
