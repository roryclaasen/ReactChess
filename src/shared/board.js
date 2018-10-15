import { PieceKing, PieceQueen, PieceKnight, PieceBishop, PieceRook, PiecePawn } from './pieces';

export const SIZE = 8;

export default class Board {
	constructor() {
		this.grid = this.blankGrid();
	}

	blankGrid = () => {
		const grid = [];
		for (let i = 0; i < SIZE; i += 1) {
			grid[i] = [];
			for (let j = 0; j < SIZE; j += 1) {
				grid[i][j] = undefined;
			}
		}

		// Pawns
		for (let x = 0; x < SIZE; x += 1) {
			grid[x][1] = new PiecePawn();
			grid[x][6] = new PiecePawn();
		}

		// Rooks
		grid[0][0] = new PieceRook();
		grid[7][0] = new PieceRook();
		grid[0][7] = new PieceRook();
		grid[7][7] = new PieceRook();

		// Knight
		grid[1][0] = new PieceKnight();
		grid[6][0] = new PieceKnight();
		grid[1][7] = new PieceKnight();
		grid[6][7] = new PieceKnight();

		// Bishop
		grid[2][0] = new PieceBishop();
		grid[5][0] = new PieceBishop();
		grid[2][7] = new PieceBishop();
		grid[5][7] = new PieceBishop();

		// Queen
		grid[3][0] = new PieceQueen();
		grid[3][7] = new PieceQueen();

		// King
		grid[4][0] = new PieceKing();
		grid[4][7] = new PieceKing();
		return grid;
	}

	charAt(x, y) {
		const piece = this.grid[x][y];
		if (piece !== undefined) return piece.name.substring(0, 2); // TODO TEMP
		return undefined;
	}
}
