import { PieceKing, PieceQueen, PieceKnight, PieceBishop, PieceRook, PiecePawn } from './pieces';

import { ItemTypes, PieceTypes, BoardSize } from './constants';


export default class Board {
	constructor() {
		this.grid = this.blankGrid();
		this.current = ItemTypes.WHITE;
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

	getPiece = (itemType, pieceType, grid) => {
		const list = [];
		for (let y = 0; y < BoardSize; y += 1) {
			for (let x = 0; x < BoardSize; x += 1) {
				const piece = grid[x][y];
				if (piece === undefined) continue;
				if (itemType !== undefined && piece.itemType !== itemType) continue;
				if (pieceType !== undefined && piece.pieceType !== pieceType) continue;
				list.push({
					x, y, piece
				});
			}
		}
		return list;
	}

	isCheck = (itemType, grid) => {
		if (itemType === undefined) {
			const white = this.isCheck(ItemTypes.WHITE, grid);
			const black = this.isCheck(ItemTypes.BLACK, grid);
			return white || black;
		}
		const oppositionType = itemType === ItemTypes.WHITE ? ItemTypes.BLACK : ItemTypes.WHITE;
		const king = this.getPiece(itemType, PieceTypes.KING, grid)[0];
		const opposition = this.getPiece(oppositionType, undefined, grid);
		let canBeTaken = false;
		opposition.forEach((item) => {
			if (item.piece.canMove(item.x, item.y, king.x, king.y, grid)) canBeTaken = true;
		});
		return canBeTaken;
	}

	isCheckMate = (itemType, grid) => {
		let canMove = false;
		const pieces = this.getPiece(itemType, undefined, grid);
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

		// eslint-disable-next-line
		if (this.isCheckMate(ItemTypes.WHITE, this.grid)) console.log('Checkmate', ItemTypes.WHITE);
		// eslint-disable-next-line
		if (this.isCheckMate(ItemTypes.BLACK, this.grid)) console.log('Checkmate', ItemTypes.BLACK);

		this.current = this.current === ItemTypes.WHITE ? ItemTypes.BLACK : ItemTypes.WHITE;
	}

	isTurn = (x, y) => {
		const piece = this.grid[x][y];
		if (piece === undefined) return false;
		return piece.itemType === this.current;
	}

	canMove = (x1, y1, x2, y2, grid) => {
		if (Number(x1) === Number(x2) && Number(y1) === Number(y2)) return false;
		const testGrid = this.makeGridCopy((grid === undefined) ? this.grid : grid);
		const piece = testGrid[x1][y1];
		if (piece === undefined) return false;

		const pieceAt = testGrid[x2][y2];
		if (pieceAt !== undefined && pieceAt.itemType === piece.itemType) return false;
		if (!piece.canMove(x1, y1, x2, y2, testGrid)) return false;

		testGrid[x2][y2] = testGrid[x1][y1];
		testGrid[x1][y1] = undefined;
		const checl = !this.isCheck(piece.itemType, testGrid);
		return checl;
	}

	makeGridCopy = (grid) => grid.map((arr) => arr.slice());
}
