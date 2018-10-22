import BlackBishop from './b_bishop_1x.png';
import BlackKing from './b_king_1x.png';
import BlackKnight from './b_knight_1x.png';
import BlackQueen from './b_queen_1x.png';
import BlackPawn from './b_pawn_1x.png';
import BlackRook from './b_rook_1x.png';

import WhiteBishop from './w_bishop_1x.png';
import WhiteKing from './w_king_1x.png';
import WhiteKnight from './w_knight_1x.png';
import WhiteQueen from './w_queen_1x.png';
import WhitePawn from './w_pawn_1x.png';
import WhiteRook from './w_rook_1x.png';

import BlackBishopHalf from './b_bishop_0.5x.png';
import BlackKingHalf from './b_king_0.5x.png';
import BlackKnightHalf from './b_knight_0.5x.png';
import BlackQueenHalf from './b_queen_0.5x.png';
import BlackPawnHalf from './b_pawn_0.5x.png';
import BlackRookHalf from './b_rook_0.5x.png';

import WhiteBishopHalf from './w_bishop_0.5x.png';
import WhiteKingHalf from './w_king_0.5x.png';
import WhiteKnightHalf from './w_knight_0.5x.png';
import WhiteQueenHalf from './w_queen_0.5x.png';
import WhitePawnHalf from './w_pawn_0.5x.png';
import WhiteRookHalf from './w_rook_0.5x.png';

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
	},
	BLACK_HALF: {
		BISHOP: BlackBishopHalf,
		KING: BlackKingHalf,
		KNIGHT: BlackKnightHalf,
		QUEEN: BlackQueenHalf,
		PAWN: BlackPawnHalf,
		ROOK: BlackRookHalf
	},
	WHITE_HALF: {
		BISHOP: WhiteBishopHalf,
		KING: WhiteKingHalf,
		KNIGHT: WhiteKnightHalf,
		QUEEN: WhiteQueenHalf,
		PAWN: WhitePawnHalf,
		ROOK: WhiteRookHalf
	}
};

export default Source;

export function getUrl(color, type, size) {
	const colorSource = color.toUpperCase() + (size === 0.5 ? '_HALF' : '');
	return Source[colorSource][type.toUpperCase()];
}

export function makeImage(color, type, size) {
	const image = new Image();
	image.src = getUrl(color, type, size);
	return image;
}
