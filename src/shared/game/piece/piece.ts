import { PieceColors, PieceTypes } from '../../constants';
import { IPiece } from '../interface';

export default abstract class Piece implements IPiece {
	public readonly color: PieceColors;
	public readonly type: PieceTypes;

	constructor(color: PieceColors, type: PieceTypes) {
		this.color = color;
		this.type = type;
	}

	public abstract canMove(x: number, y: number, toX: number, toY: number, grid?: Piece[][]): boolean;
}
