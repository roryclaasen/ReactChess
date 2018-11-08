import { PieceColors, PieceNotation, PieceTypes } from '../constants';
import Piece from './piece/piece';
import { IMove, IColorMove, ICords } from './interface';

export default class Move implements IMove {
	public white: IColorMove;
	public black: IColorMove;

	public add(piece: Piece, from: ICords, to: ICords, capture?: Piece): void {
		if (piece.color === PieceColors.WHITE) this.addWhite(piece, from, to, capture);
		if (piece.color === PieceColors.BLACK) this.addBlack(piece, from, to, capture);
	}

	public addWhite(piece: Piece, from: ICords, to: ICords, capture?: Piece): void {
		this.white = {
			piece,
			from,
			to,
			capture
		};
	}

	public addBlack(piece: Piece, from: ICords, to: ICords, capture?: Piece): void {
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

	public get notation(): string[] {
		return [this.format(PieceColors.WHITE), this.format(PieceColors.BLACK)];
	}
}
