import { PieceColors, PieceTypes } from '../../constants';
import { IPiece } from '../../interface';

export default abstract class Piece implements IPiece {
	public readonly color: PieceColors;
	public readonly type: PieceTypes;

	constructor(color: PieceColors, type: PieceTypes) {
		this.color = color;
		this.type = type;
	}

	/**
	 * @abstract
	 * @param {number} x Start X coordinate
	 * @param {number} y Start Y coordinate
	 * @param {number} toX End X coordinate
	 * @param {number} toY End Y coordinate
	 * @param {Piece[][]} [grid] The grid to test the move on
	 * @returns {boolean} If Piece can in fact move
	 * @memberof Piece
	 */
	public abstract canMove(x: number, y: number, toX: number, toY: number, grid?: Piece[][]): boolean;
}
