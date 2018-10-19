export const ItemTypes = {
	BLACK: 'black',
	WHITE: 'white'
};

export const WinnerState = {
	BLACK: ItemTypes.BLACK,
	WHITE: ItemTypes.WHITE,
	STALEMATE: 'stalemate'
};

export const PieceTypes = {
	KING: 'king',
	QUEEN: 'queen',
	BISHOP: 'bishop',
	KNIGHT: 'knight',
	ROOK: 'rook',
	PAWN: 'pawn'
};

export const BoardSize = 8;

export default {
	ItemTypes,
	PieceTypes,
	BoardSize
};
