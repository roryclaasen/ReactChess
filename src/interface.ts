import { PieceColors, PieceTypes, WinnerState } from './constants';

export interface IPiece {
	color: PieceColors;
	type: PieceTypes;
}

export interface IMove {
	white: IColorMove;
	black: IColorMove;
}

export interface IColorMove {
	piece: IPiece;
	from: ICords;
	to: ICords;
	capture?: IPiece;
}

export interface ICords {
	x: number;
	y: number;
}
