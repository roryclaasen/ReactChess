import BlackBishop from './b_bishop.png';
import BlackKing from './b_king.png';
import BlackKnight from './b_knight.png';
import BlackQueen from './b_queen.png';
import BlackPawn from './b_pawn.png';
import BlackRook from './b_rook.png';

import WhiteBishop from './w_bishop.png';
import WhiteKing from './w_king.png';
import WhiteKnight from './w_knight.png';
import WhiteQueen from './w_queen.png';
import WhitePawn from './w_pawn.png';
import WhiteRook from './w_rook.png';

const Source = {
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

export default Source;

export function getUrl(color, type) {
	return Source[color.toUpperCase()][type.toUpperCase()];
}

export function makeImage(color, type) {
	const image = new Image();
	image.src = getUrl(color, type);
	return image;
}
