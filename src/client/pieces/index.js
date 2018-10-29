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

const Source = {
	Default: {
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
	}
};

let current = Source.Default;

export default Source;

export function ChangeCurrent(style) {
	if (style in Source) current = Source[style];
}

export function getUrl(color, type) {
	return current[color][type];
}

export function makeImage(color, type) {
	const image = new Image();
	image.src = getUrl(color, type);
	return image;
}
