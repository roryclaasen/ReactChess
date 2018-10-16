import { PieceKing, PieceQueen, PieceKnight, PieceBishop, PieceRook, PiecePawn } from './pieces';

import { ItemTypes } from './constants';

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
			grid[x][1] = new PiecePawn(ItemTypes.WHITE);
			grid[x][6] = new PiecePawn(ItemTypes.BLACK);
		}

		// Rooks
		grid[0][0] = new PieceRook(ItemTypes.WHITE);
		grid[7][0] = new PieceRook(ItemTypes.WHITE);
		grid[0][7] = new PieceRook(ItemTypes.BLACK);
		grid[7][7] = new PieceRook(ItemTypes.BLACK);

		// Knight
		grid[1][0] = new PieceKnight(ItemTypes.WHITE);
		grid[6][0] = new PieceKnight(ItemTypes.WHITE);
		grid[1][7] = new PieceKnight(ItemTypes.BLACK);
		grid[6][7] = new PieceKnight(ItemTypes.BLACK);

		// Bishop
		grid[2][0] = new PieceBishop(ItemTypes.WHITE);
		grid[5][0] = new PieceBishop(ItemTypes.WHITE);
		grid[2][7] = new PieceBishop(ItemTypes.BLACK);
		grid[5][7] = new PieceBishop(ItemTypes.BLACK);

		// Queen
		grid[3][0] = new PieceQueen(ItemTypes.WHITE);
		grid[3][7] = new PieceQueen(ItemTypes.BLACK);

		// King
		grid[4][0] = new PieceKing(ItemTypes.WHITE);
		grid[4][7] = new PieceKing(ItemTypes.BLACK);

		return grid;
	}

	pieceAt(x, y) {
		const piece = this.grid[x][y];
		if (piece !== undefined) return piece;
		return undefined;
	}

	move = (x1, y1, x2, y2) => {
		if (Number(x1) === Number(x2) && Number(y1) === Number(y2)) return;
		this.grid[x2][y2] = this.grid[x1][y1];
		this.grid[x1][y1] = undefined;
	}

	canMove = (x1, y1, x2, y2) => {
		if (Number(x1) === Number(x2) && Number(y1) === Number(y2)) return false;
		const piece = this.grid[x1][y1];
		if (piece === undefined) return false;
		// TODO Check if you can take a piece
		return piece.canMove(x1, y1, x2, y2);
	}
}
