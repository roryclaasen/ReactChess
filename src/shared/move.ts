import { PieceColors, PieceNotation, PieceTypes } from './constants';
import Piece from './piece/piece';

interface ColorMove {
	piece: Piece;
	from: Cords;
	to: Cords;
	capture?: Piece;
}

interface Cords {
	x: number;
	y: number;
}

export default class Move {
	private white: ColorMove;
	private black: ColorMove;

	public add(piece: Piece, from: Cords, to: Cords, capture?: Piece): void {
		if (piece.color === PieceColors.WHITE) this.addWhite(piece, from, to, capture);
		if (piece.color === PieceColors.BLACK) this.addBlack(piece, from, to, capture);
	}

	public addWhite(piece: Piece, from: Cords, to: Cords, capture?: Piece): void {
		this.white = {
			piece,
			from,
			to,
			capture
		};
	}

	public addBlack(piece: Piece, from: Cords, to: Cords, capture?: Piece): void {
		this.black = {
			piece,
			from,
			to,
			capture
		};
	}

	private format(color: PieceColors): string {
		const data = color === PieceColors.WHITE ? this.white : this.black;
		if (data === undefined) return '';
		let notation = PieceNotation[data.piece.type];
		if (data.capture && data.piece.type === PieceTypes.PAWN) notation = String.fromCharCode(97 + data.from.x);
		if (notation === undefined) notation = '';
		const capture = data.capture ? PieceNotation.CAPTURE : '';
		return `${notation}${capture}${String.fromCharCode(65 + data.to.x)}${data.to.y}`;
	}

	public get notation() {
		return [this.format(PieceColors.WHITE), this.format(PieceColors.BLACK)];
	}
}
