import Board from '../../shared/game/board';

export interface IPlayer {
	id: string;
	name?: string;
}

export default class OnlineBoard {
	public readonly token: string;
	public readonly board: Board;
	public readonly players: IPlayer[];
	public readonly spectators: IPlayer[];

	constructor(token: string, player?: IPlayer) {
		this.token = token;

		this.board = new Board();

		this.players = [];
		this.spectators = [];

		if (player) this.addPlayer(player);
	}

	public addPlayer(player: IPlayer): void {
		if (this.players.length >= 2) this.spectators.push(player);
		else this.players.push(player);
	}

	public get playable(): boolean {
		return this.players.length === 2;
	}
}
