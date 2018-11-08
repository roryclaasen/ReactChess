import Board from '../../shared/board';

export default class OnlineBoard {
	public readonly token: string;
	public readonly board: Board;
	public readonly players: any[];
	public readonly spectators: any[];

	constructor(token: string) {
		this.token = token;

		this.board = new Board();

		this.players = [];
		this.spectators = [];
	}

	public addPlayer(player: any): void {
		if (this.players.length >= 2) this.spectators.push(player);
		else this.players.push(player);
	}

	public get playable(): boolean {
		return this.players.length === 2;
	}
}
