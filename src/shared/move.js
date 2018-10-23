import { PieceColors, PieceNotation, PieceTypes } from './constants';

export default class Move {
	constructor() {
		this.white = undefined;
		this.black = undefined;
	}

	add(piece, from, to, capture) {
		if (piece.color === PieceColors.WHITE) this.addWhite(piece, from, to, capture);
		if (piece.color === PieceColors.BLACK) this.addBlack(piece, from, to, capture);
	}

	addWhite = (piece, from, to, capture) => {
		this.white = {
			piece,
			from,
			to,
			capture
		};
	}

	addBlack = (piece, from, to, capture) => {
		this.black = {
			piece,
			from,
			to,
			capture
		};
	}

	format = (color) => {
		const data = color === PieceColors.WHITE ? this.white : this.black;
		if (data === undefined) return '';
		let notation = PieceNotation[data.piece.type];
		if (data.capture && data.piece.type === PieceTypes.PAWN) notation = String.fromCharCode(97 + data.from.x);
		if (notation === undefined) notation = '';
		const capture = data.capture ? PieceNotation.CAPTURE : '';
		return `${notation}${capture}${String.fromCharCode(65 + data.to.x)}${data.to.y}`;
	}

	notation = () => [this.format(PieceColors.WHITE), this.format(PieceColors.BLACK)];
}
