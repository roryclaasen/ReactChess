export const PieceColors = {
	BLACK: 'BLACK',
	WHITE: 'WHITE'
};

export const PieceTypes = {
	KING: 'KING',
	QUEEN: 'QUEEN',
	BISHOP: 'BISHOP',
	KNIGHT: 'KNIGHT',
	ROOK: 'ROOK',
	PAWN: 'PAWN'
};

export const PieceNotation = {
	KING: 'K',
	QUEEN: 'Q',
	BISHOP: 'B',
	KNIGHT: 'N',
	ROOK: 'R',
	CAPTURE: 'x'
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
	PieceNotation,
	BoardSize
};
