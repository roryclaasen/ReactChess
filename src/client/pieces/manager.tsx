import * as React from 'react';

import DefaultBlackBishop from './default/b_bishop.png';
import DefaultBlackKing from './default/b_king.png';
import DefaultBlackKnight from './default/b_knight.png';
import DefaultBlackQueen from './default/b_queen.png';
import DefaultBlackPawn from './default/b_pawn.png';
import DefaultBlackRook from './default/b_rook.png';

import DefaultWhiteBishop from './default/w_bishop.png';
import DefaultWhiteKing from './default/w_king.png';
import DefaultWhiteKnight from './default/w_knight.png';
import DefaultWhiteQueen from './default/w_queen.png';
import DefaultWhitePawn from './default/w_pawn.png';
import DefaultWhiteRook from './default/w_rook.png';

import { PieceColors, PieceTypes } from '../../constants';

interface IPieceList {
	[key: string]: string;

	BISHOP: string;
	KING: string;
	KNIGHT: string;
	QUEEN: string;
	PAWN: string;
	ROOK: string;
}

interface IPieceSet {
	[key: string]: IPieceList;

	BLACK: IPieceList;
	WHITE: IPieceList;
}

class PieceManager {
	private source: { [key: string]: IPieceSet };
	private currentKey: string;

	constructor() {
		this.source = {};

		this.addSet('Default', {
			BLACK: {
				BISHOP: DefaultBlackBishop,
				KING: DefaultBlackKing,
				KNIGHT: DefaultBlackKnight,
				QUEEN: DefaultBlackQueen,
				PAWN: DefaultBlackPawn,
				ROOK: DefaultBlackRook
			},
			WHITE: {
				BISHOP: DefaultWhiteBishop,
				KING: DefaultWhiteKing,
				KNIGHT: DefaultWhiteKnight,
				QUEEN: DefaultWhiteQueen,
				PAWN: DefaultWhitePawn,
				ROOK: DefaultWhiteRook
			}
		});

		this.currentKey = this.keys[0];
	}

	public get current(): IPieceSet {
		return this.source[this.currentKey];
	}

	public get keys(): string[] {
		return Object.keys(this.source);
	}

	public changeCurrent(key: string): void {
		if (!(key in this.keys)) return;
		this.currentKey = key;
	}

	public getImageDataString(color: PieceColors, type: PieceTypes): string {
		return this.current[PieceColors[color]][PieceTypes[type]];
	}

	public getImageElement(color: PieceColors, type: PieceTypes): HTMLImageElement {
		const image = new Image();
		image.src = this.getImageDataString(color, type);
		return image;
	}

	public getImageJSX(color: PieceColors, type: PieceTypes): JSX.Element {
		return (
			<img src={this.getImageDataString(color, type)} />
		);
	}

	private addSet(key: string, set: IPieceSet): void {
		this.source[key] = set;
	}
}

const manager = new PieceManager();
export default manager as PieceManager;
