import { ChessInstance, Square } from 'chess.js';
// https://github.com/jhlywa/chess.js/issues/196
const chess = require('chess.js');

export default class ChessGame {

	public readonly game: ChessInstance;

	constructor() {
		this.game = new chess();
	}

	public get(x: number, y: number) {
		return this.game.get(this.actualSquare(x, y));
	}

	public actual(x: number, y: number) {
		const aX = String.fromCharCode(97 + x);
		const aY = y + 1;
		return {
			x: aX,
			y: aY
		};
	}

	public actualSquare(x: number, y: number): Square {
		const a = this.actual(x, y);
		return `${a.x}${a.y}` as Square;
	}

	public color(x: number, y: number) {
		return this.game.square_color(this.actualSquare(x, y));
	}

	public board() {
		const board = [];
		const size = 8;
		for (let y = size - 1; y >= 0; y -= 1) {
			const row = [];
			for (let x = 0; x < size; x += 1) {
				row.push(this.get(x, y));
			}
			board.push(row);
		}
		return board;
	}

	public move(x1: number, y1: number, x2: number, y2: number) {
		const from = this.actualSquare(x1, y1);
		const to = this.actualSquare(x2, y2);
		return this.game.move({ from, to });
	}
}
