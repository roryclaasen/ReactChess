import React from 'react';

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

class PieceManager {
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

	get current() {
		return this.source[this.currentKey];
	}

	get keys() {
		return Object.keys(this.source);
	}

	changeCurrent(key) {
		if (!(key in this.keys)) return;
		this.currentKey = key;
	}

	getImageDataString(color, type) {
		return this.current[color][type];
	}

	getImageElement(color, type) {
		const image = new Image();
		image.src = this.getImageDataString(color, type);
		return image;
	}

	getImageJSX(color, type) {
		return (
			<img src={this.getImageDataString(color, type)} alt={`${color} ${type}`} />
		);
	}

	addSet(key, set) {
		this.source[key] = set;
	}
}

const manager = new PieceManager();
export default manager;
