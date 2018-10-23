export const PieceColors = {
	BLACK: 'black',
	WHITE: 'white'
};

export const PieceTypes = {
	KING: 'king',
	QUEEN: 'queen',
	BISHOP: 'bishop',
	KNIGHT: 'knight',
	ROOK: 'rook',
	PAWN: 'pawn'
};

export const WinnerState = {
	BLACK: PieceColors.BLACK,
	WHITE: PieceColors.WHITE,
	STALEMATE: 'stalemate'
};

export const BoardSize = 8;

export default {
	PieceColors,
	PieceTypes,
	BoardSize
};
