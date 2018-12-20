import { ChessInstance, Square } from 'chess.js';
// https://github.com/jhlywa/chess.js/issues/196
const chess = require('chess.js');

export default class ChessGame {

	private game: ChessInstance;

	constructor() {
		this.game = new chess();
	}

	public get(x: number, y: number) {
		const a = this.actual(x, y);
		return this.game.get(`${a.x}${a.y}` as Square);
	}

	public actual(x: number, y: number) {
		const aX = String.fromCharCode(97 + x);
		const aY = y + 1;
		return {
			x: aX,
			y: aY
		};
	}

	public boardColor(x: number, y: number) {
		if (x % 2 === 0 && y % 2 === 0) return 'alternate';
		if (x % 2 === 1 && y % 2 === 1) return 'alternate';
		return 'default';
	}

	public board() {
		const board = [];
		const size = 8;
		for (let y = 0; y < size; y += 1) {
			const row = [];
			for (let x = 0; x < size; x += 1) {
				row.push(this.get(x, y));
			}
			board.push(row);
		}
		return board;
	}

	public instance(): ChessInstance {
		return this.game;
	}
}
