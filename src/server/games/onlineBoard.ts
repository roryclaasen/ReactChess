import Board from '../../shared/game/board';

export interface Player {
	id: string;
	name?: string;
}

export default class OnlineBoard {
	public readonly token: string;
	public readonly board: Board;
	public readonly players: Player[];
	public readonly spectators: Player[];

	constructor(token: string, player?: Player) {
		this.token = token;

		this.board = new Board();

		this.players = [];
		this.spectators = [];

		if (player) this.addPlayer(player);
	}

	public addPlayer(player: Player): void {
		if (this.players.length >= 2) this.spectators.push(player);
		else this.players.push(player);
	}

	public get playable(): boolean {
		return this.players.length === 2;
	}
}
