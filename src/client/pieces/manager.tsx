import React from 'react';

import BlackPawn from './default/b_pawn.png';
import BlackKnight from './default/b_knight.png';
import BlackBishop from './default/b_bishop.png';
import BlackRook from './default/b_rook.png';
import BlackQueen from './default/b_queen.png';
import BlackKing from './default/b_king.png';

import WhitePawn from './default/w_pawn.png';
import WhiteKnight from './default/w_knight.png';
import WhiteBishop from './default/w_bishop.png';
import WhiteRook from './default/w_rook.png';
import WhiteQueen from './default/w_queen.png';
import WhiteKing from './default/w_king.png';

import { Piece } from 'chess.js';

interface IPieces {
	PAWN: string;
	KNIGHT: string;
	BISHOP: string;
	ROOK: string;
	QUEEN: string;
	KING: string;
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
				PAWN: BlackPawn,
				KNIGHT: BlackKnight,
				BISHOP: BlackBishop,
				ROOK: BlackRook,
				QUEEN: BlackQueen,
				KING: BlackKing
			},
			WHITE: {
				PAWN: WhitePawn,
				KNIGHT: WhiteKnight,
				BISHOP: WhiteBishop,
				ROOK: WhiteRook,
				QUEEN: WhiteQueen,
				KING: WhiteKing
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

	getImageJSX(piece: Piece, className: string | string[] = ''): JSX.Element {
		let styleClass: string[] = [];
		if (className instanceof String) styleClass.push(className as string);
		else styleClass = className as string[];
		return <img src={this.get(piece)} alt={`${piece.color} ${piece.type}`} className={styleClass.join(' ')} />;
	}
}

const manager = new PieceManager();
export default manager;
