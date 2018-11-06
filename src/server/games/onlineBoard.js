import Board from '../../shared/board';

export default class OnlineBoard {
	constructor() {
		this.board = new Board();

		this.players = [];
		this.spectators = [];
	}

	addPlayer = (player) => {
		if (this.players.length >= 2) this.spectators.push(player);
		else this.players.push(player);
	}

	canPlay = () => this.players.length === 2;
}
