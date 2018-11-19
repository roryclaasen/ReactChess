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

export interface IBoard {
	winner: WinnerState;
	current: PieceColors;

	grid: IPiece[][];

	moves: IMove[];
}

export interface IPlayer {
	id: string;
	name?: string;
}

export interface IOnlineBoard {
	token: string;
	playable: boolean;

	players: IPlayer[];
	spectators: IPlayer[];
}

export interface ISocketError {
	data: any;
	error: string;
	stack: Error;
}
