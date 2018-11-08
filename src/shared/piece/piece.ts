import { PieceColors, PieceTypes } from '../constants';

export default abstract class Piece {
	public readonly color: PieceColors;
	public readonly type: PieceTypes;

	constructor(color: PieceColors, type: PieceTypes) {
		this.color = color;
		this.type = type;
	}

	public abstract canMove(x: number, yx: number, toXx: number, toYx: number, grid?: Piece[][]): boolean;
}
