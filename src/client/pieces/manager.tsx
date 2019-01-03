import React from 'react';

import BlackBishop from './default/b_bishop.png';
import BlackKing from './default/b_king.png';
import BlackKnight from './default/b_knight.png';
import BlackQueen from './default/b_queen.png';
import BlackPawn from './default/b_pawn.png';
import BlackRook from './default/b_rook.png';

import WhiteBishop from './default/w_bishop.png';
import WhiteKing from './default/w_king.png';
import WhiteKnight from './default/w_knight.png';
import WhiteQueen from './default/w_queen.png';
import WhitePawn from './default/w_pawn.png';
import WhiteRook from './default/w_rook.png';

import { Piece } from 'chess.js';

interface IPieces {
	BISHOP: string;
	KING: string;
	KNIGHT: string;
	QUEEN: string;
	PAWN: string;
	ROOK: string;
}

interface ISourceSet {
	BLACK: IPieces;
	WHITE: IPieces;
}

class PieceManager {
	private source: ISourceSet;

	constructor() {
		this.source = {
			BLACK: {
				BISHOP: BlackBishop,
				KING: BlackKing,
				KNIGHT: BlackKnight,
				QUEEN: BlackQueen,
				PAWN: BlackPawn,
				ROOK: BlackRook
			},
			WHITE: {
				BISHOP: WhiteBishop,
				KING: WhiteKing,
				KNIGHT: WhiteKnight,
				QUEEN: WhiteQueen,
				PAWN: WhitePawn,
				ROOK: WhiteRook
			}
		};
	}

	get(piece: Piece): string {
		let set;
		if (piece.color === 'b') set = this.source.BLACK;
		if (piece.color === 'w') set = this.source.WHITE;
		if (!set) return '';
		if (piece.type === 'p') return set.PAWN;
		if (piece.type === 'n') return set.KNIGHT;
		if (piece.type === 'b') return set.BISHOP;
		if (piece.type === 'r') return set.ROOK;
		if (piece.type === 'q') return set.QUEEN;
		if (piece.type === 'k') return set.KING;
		return '';
	}

	getImageElement(piece: Piece): HTMLImageElement {
		const image = new Image();
		image.src = this.get(piece);
		return image;
	}

	getImageJSX(piece: Piece): JSX.Element {
		return (
			<img src={this.get(piece)} alt={`${piece.color} ${piece.type}`} />
		);
	}
}

const manager = new PieceManager();
export default manager;
