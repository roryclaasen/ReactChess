import { PieceKing, PieceQueen, PieceKnight, PieceBishop, PieceRook, PiecePawn } from './pieces';

import { PieceColors, PieceTypes, BOARD_SIZE, WinnerState } from '../constants';
import Move from './move';
import Piece from './piece/piece';
import { IBoard, IPiece, IMove } from '../interface';

export default class Board implements IBoard {
	private _grid: Piece[][];
	private _current: PieceColors;
	private _winner: WinnerState;
	private _moves: Move[];

	constructor() {
		this._grid = this.blankGrid();
		this._current = PieceColors.WHITE;
		this._moves = [];
	}

	private emptyGrid(): Piece[][] {
		const grid: Piece[][] = [];
		for (let i = 0; i < BOARD_SIZE; i += 1) {
			grid[i] = [];
			for (let j = 0; j < BOARD_SIZE; j += 1) {
				grid[i][j] = undefined;
			}
		}
		return grid;
	}

	private blankGrid(): Piece[][] {
		const grid: Piece[][] = this.emptyGrid();

		// Pawns
		for (let x = 0; x < BOARD_SIZE; x += 1) {
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

	public getPiece(color: PieceColors, type: PieceTypes, grid: Piece[][]) {
		const list = [];
		for (let y = 0; y < BOARD_SIZE; y += 1) {
			for (let x = 0; x < BOARD_SIZE; x += 1) {
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

	public isCheck(color: PieceColors, grid: Piece[][]): boolean {
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

	public isCheckMate(color: PieceColors, grid: Piece[][]): boolean {
		let canMove = false;
		const pieces = this.getPiece(color, undefined, grid);
		pieces.some((piece) => {
			for (let x = 0; x < BOARD_SIZE; x += 1) {
				if (canMove) break;
				for (let y = 0; y < BOARD_SIZE; y += 1) {
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

	public move(x1: number, y1: number, x2: number, y2: number): void {
		if (!this.isTurn(x1, y1) || !this.canMove(x1, y1, x2, y2, this.grid)) return;

		const piece = this.grid[x1][y1];
		const capture = this.grid[x2][y2];

		if (piece.color === PieceColors.WHITE) this.moves.push(new Move());
		this.moves[this.moves.length - 1].add(piece, { x: x1, y: y1 }, { x: x2, y: y2 }, capture);

		this.grid[x2][y2] = this.grid[x1][y1];
		this.grid[x1][y1] = undefined;

		if (this.isCheckMate(PieceColors.WHITE, this.grid)) {
			this._winner = WinnerState.BLACK;
		}
		if (this.isCheckMate(PieceColors.BLACK, this.grid)) {
			if (this.winner === WinnerState.BLACK) this._winner = WinnerState.STALEMATE;
			else this._winner = WinnerState.WHITE;
		}
		// TODO Propper stalemate
		if (this.winner === undefined) this._current = this.current === PieceColors.WHITE ? PieceColors.BLACK : PieceColors.WHITE;
	}

	public isTurn(x: number, y: number): boolean {
		if (this.winner) return false;
		const piece = this.grid[x][y];
		if (piece === undefined) return false;
		return piece.color === this.current;
	}

	public canMove(x1: number, y1: number, x2: number, y2: number, grid?: Piece[][]): boolean {
		if (x1 === x2 && y1 === y2) return false;
		const testGrid = this.copyGrid((grid === undefined) ? this.grid : grid);
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

	public copyGrid(grid: Piece[][]): Piece[][] {
		return grid.map((arr: any) => arr.slice());
	}

	public get grid() {
		return this._grid;
	}

	public get moves() {
		return this._moves;
	}

	public get winner() {
		return this._winner;
	}

	public get current() {
		return this._current;
	}

	private newPiece(data: IPiece): Piece {
		switch (data.type) {
			case PieceTypes.BISHOP: return new PieceBishop(data.color);
			case PieceTypes.KING: return new PieceKing(data.color);
			case PieceTypes.QUEEN: return new PieceQueen(data.color);
			case PieceTypes.KNIGHT: return new PieceKnight(data.color);
			case PieceTypes.ROOK: return new PieceRook(data.color);
			default: return new PiecePawn(data.color);
		}
	}

	public write(): IBoard {
		const simpleGrid: IPiece[][] = [];
		for (let x = 0; x < BOARD_SIZE; x += 1) {
			for (let y = 0; y < BOARD_SIZE; y += 1) {
				const cell = this.grid[x][y];
				if (cell !== undefined) {
					simpleGrid[x][y] = {
						color: cell.color,
						type: cell.type
					};
				} else simpleGrid[x][y] = undefined;
			}
		}

		const simpleMoves: IMove[] = [];
		this.moves.forEach((m) => {
			simpleMoves.push({
				black: m.black,
				white: m.white
			});
		});
		return {
			winner: this.winner,
			current: this.current,
			grid: simpleGrid,
			moves: simpleMoves
		};
	}

	public read(data: IBoard): void {
		this._grid = this.emptyGrid();
		for (let x = 0; x < BOARD_SIZE; x += 1) {
			for (let y = 0; y < BOARD_SIZE; y += 1) {
				const cell = data.grid[x][y];
				if (cell === undefined) continue;
				this._grid[x][y] = this.newPiece(cell);
			}
		}
		this._moves = [];
		data.moves.forEach((m) => {
			const move = new Move();
			move.white = m.white;
			move.black = m.black;
			this._moves.push(move);
		});
		this._current = data.current;
		this._winner = data.winner;
	}
}
