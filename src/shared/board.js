import { PieceKing, PieceQueen, PieceKnight, PieceBishop, PieceRook, PiecePawn } from './pieces';

import { PieceColors, PieceTypes, BoardSize, WinnerState } from './constants';


export default class Board {
	constructor() {
		this.grid = this.blankGrid();
		this.current = PieceColors.WHITE;
		this.winner = undefined;
	}

	blankGrid = () => {
		const grid = [];
		for (let i = 0; i < BoardSize; i += 1) {
			grid[i] = [];
			for (let j = 0; j < BoardSize; j += 1) {
				grid[i][j] = undefined;
			}
		}

		// Pawns
		for (let x = 0; x < BoardSize; x += 1) {
			grid[x][1] = new PiecePawn(PieceColors.WHITE);
			grid[x][6] = new PiecePawn(PieceColors.BLACK);
		}

		// Rooks
		grid[0][0] = new PieceRook(PieceColors.WHITE);
		grid[7][0] = new PieceRook(PieceColors.WHITE);
		grid[0][7] = new PieceRook(PieceColors.BLACK);
		grid[7][7] = new PieceRook(PieceColors.BLACK);

		// Knight
		grid[1][0] = new PieceKnight(PieceColors.WHITE);
		grid[6][0] = new PieceKnight(PieceColors.WHITE);
		grid[1][7] = new PieceKnight(PieceColors.BLACK);
		grid[6][7] = new PieceKnight(PieceColors.BLACK);

		// Bishop
		grid[2][0] = new PieceBishop(PieceColors.WHITE);
		grid[5][0] = new PieceBishop(PieceColors.WHITE);
		grid[2][7] = new PieceBishop(PieceColors.BLACK);
		grid[5][7] = new PieceBishop(PieceColors.BLACK);

		// Queen
		grid[3][0] = new PieceQueen(PieceColors.WHITE);
		grid[3][7] = new PieceQueen(PieceColors.BLACK);

		// King
		grid[4][0] = new PieceKing(PieceColors.WHITE);
		grid[4][7] = new PieceKing(PieceColors.BLACK);

		return grid;
	}

	pieceAt(x, y) {
		const piece = this.grid[x][y];
		if (piece !== undefined) return piece;
		return undefined;
	}

	getPiece = (color, type, grid) => {
		const list = [];
		for (let y = 0; y < BoardSize; y += 1) {
			for (let x = 0; x < BoardSize; x += 1) {
				const piece = grid[x][y];
				if (piece === undefined) continue;
				if (color !== undefined && piece.color !== color) continue;
				if (type !== undefined && piece.type !== type) continue;
				list.push({
					x, y, piece
				});
			}
		}
		return list;
	}

	isCheck = (color, grid) => {
		if (color === undefined) {
			const white = this.isCheck(PieceColors.WHITE, grid);
			const black = this.isCheck(PieceColors.BLACK, grid);
			return white || black;
		}
		const oppositionColor = color === PieceColors.WHITE ? PieceColors.BLACK : PieceColors.WHITE;
		const king = this.getPiece(color, PieceTypes.KING, grid)[0];
		const opposition = this.getPiece(oppositionColor, undefined, grid);
		let canBeTaken = false;
		opposition.forEach((item) => {
			if (item.piece.canMove(item.x, item.y, king.x, king.y, grid)) canBeTaken = true;
		});
		return canBeTaken;
	}

	isCheckMate = (color, grid) => {
		let canMove = false;
		const pieces = this.getPiece(color, undefined, grid);
		pieces.some((piece) => {
			for (let x = 0; x < BoardSize; x += 1) {
				if (canMove) break;
				for (let y = 0; y < BoardSize; y += 1) {
					if (canMove) break;
					if (this.canMove(piece.x, piece.y, x, y, grid)) {
						canMove = true;
					}
				}
			}
			return canMove;
		});
		return !canMove;
	}

	move = (x1, y1, x2, y2) => {
		if (!this.isTurn(x1, y1) || !this.canMove(x1, y1, x2, y2, this.grid, true)) return;
		this.grid[x2][y2] = this.grid[x1][y1];
		this.grid[x1][y1] = undefined;

		if (this.isCheckMate(PieceColors.WHITE, this.grid)) {
			this.winner = WinnerState.BLACK;
		}
		if (this.isCheckMate(PieceColors.BLACK, this.grid)) {
			if (this.winner === WinnerState.BLACK) this.winner = WinnerState.STALEMATE;
			else this.winner = WinnerState.WHITE;
		}
		if (this.winner === undefined) this.current = this.current === PieceColors.WHITE ? PieceColors.BLACK : PieceColors.WHITE;
	}

	isTurn = (x, y) => {
		if (this.winner) return false;
		const piece = this.grid[x][y];
		if (piece === undefined) return false;
		return piece.color === this.current;
	}

	canMove = (x1, y1, x2, y2, grid) => {
		if (Number(x1) === Number(x2) && Number(y1) === Number(y2)) return false;
		const testGrid = this.makeGridCopy((grid === undefined) ? this.grid : grid);
		const piece = testGrid[x1][y1];
		if (piece === undefined) return false;

		const pieceAt = testGrid[x2][y2];
		if (pieceAt !== undefined && pieceAt.color === piece.color) return false;
		if (!piece.canMove(x1, y1, x2, y2, testGrid)) return false;

		testGrid[x2][y2] = testGrid[x1][y1];
		testGrid[x1][y1] = undefined;
		const checl = !this.isCheck(piece.color, testGrid);
		return checl;
	}

	makeGridCopy = (grid) => grid.map((arr) => arr.slice());
}
