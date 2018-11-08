export enum PieceColors {
	BLACK, WHITE
}

export enum PieceNotation {
	KING = 'K',
	QUEEN = 'Q',
	BISHOP = 'B',
	KNIGHT = 'N',
	ROOK = 'R',
	CAPTURE = 'x'
}

export enum PieceTypes {
	KING,
	QUEEN,
	BISHOP,
	KNIGHT,
	ROOK,
	PAWN
}

export enum WinnerState {
	BLACK = 'black',
	WHITE = 'white',
	STALEMATE = 'stalemate'
}

export const BOARD_SIZE = 8;

export default {
	PieceColors,
	PieceTypes,
	PieceNotation,
	BOARD_SIZE,
	WinnerState
};
