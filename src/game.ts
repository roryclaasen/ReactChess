import { ChessInstance, Square, Move, Piece } from 'chess.js';
// https://github.com/jhlywa/chess.js/issues/196
const chess = require('chess.js');

export default class ChessGame {

	protected game: ChessInstance;

	constructor() {
		this.game = new chess();
		this.newGame();
	}

	public newGame(fen?: string) {
		const date = new Date();
		this.game = new chess();
		if (fen) this.game.load(fen);
		this.game.header('date', date.toLocaleDateString('en-GB'));
	}

	public setName(color: 'White' | 'Black', name: string): void {
		this.game.header(color, name);
	}

	public getName(color: 'White' | 'Black'): string | undefined {
		const name = this.game.header()[color];
		if (name) return name;
		return undefined;
	}

	public get(x: number, y: number): Piece | null {
		return this.game.get(this.actualSquare(x, y));
	}

	public actual(x: number, y: number) {
		const aX = String.fromCharCode(97 + x);
		const aY = y + 1;
		return {
			x: `${aX}`,
			y: `${aY}`
		};
	}

	public actualSquare(x: number, y: number): Square {
		const a = this.actual(x, y);
		return `${a.x}${a.y}` as Square;
	}

	public color(x: number, y: number): 'light' | 'dark' {
		return this.game.square_color(this.actualSquare(x, y));
	}

	public board(flip: boolean = false): (Piece | null)[][] {
		const board = [];
		if (flip) {
			for (let y = 0; y < 8; y += 1) {
				board.push(this.boardRow(y));
			}
		} else {
			for (let y = 7; y >= 0; y -= 1) {
				board.push(this.boardRow(y));
			}
		}
		return board;
	}

	private boardRow(y: number) {
		const row = [];
		for (let x = 0; x < 8; x += 1) {
			row.push(this.get(x, y));
		}
		return row;
	}

	public move(x1: number, y1: number, x2: number, y2: number): Move | null {
		const from = this.actualSquare(x1, y1);
		const to = this.actualSquare(x2, y2);
		return this.game.move({ from, to });
	}

	public turnColor(): 'White' | 'Black' {
		if (this.game.turn() === this.game.WHITE) return 'White';
		return 'Black';
	}

	public turn(): string {
		const color = this.turnColor() as string;
		const name = this.game.header()[color];
		if (name) return name;
		return color;
	}

	public opponentColor(): 'White' | 'Black' {
		if (this.game.turn() === this.game.WHITE) return 'Black';
		return 'White';
	}

	public opponent(): string {
		const color = this.opponentColor() as string;
		const name = this.game.header()[color];
		if (name) return name;
		return color;
	}

	public get instance(): ChessInstance {
		return this.game;
	}
}
