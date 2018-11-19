import Board from '../../shared/game/board';
import { IBoard } from '../../shared/game/interface';

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

	public getPlayer(id: string): IPlayer {
		return this.players.find(p => p.id === id);
	}

	public getSpectator(id: string): IPlayer {
		return this.spectators.find(p => p.id === id);
	}

	public removePlayer(id: string): void {
		const player = this.getPlayer(id);
		if (player) {
			const index = this.players.indexOf(player);
			this.players.splice(index);
		}
		const spectator = this.getSpectator(id);
		if (spectator) {
			const index = this.spectators.indexOf(player);
			this.spectators.splice(index);
		}
	}

	public write(): IBoard {
		return this.board.write();
	}

	public addPlayer(player: IPlayer): void {
		if (this.players.length >= 2) this.spectators.push(player);
		else this.players.push(player);
	}

	public get playable(): boolean {
		return this.players.length === 2;
	}
}
