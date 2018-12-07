import Piece from './piece';
import { pawn as moveLogic } from '../piece.logic';
import { PieceTypes, PieceColors } from '../../constants';

class PiecePawn extends Piece {
	constructor(color: PieceColors) {
		super(color, PieceTypes.PAWN);
	}

	public canMove(x: number, y: number, toX: number, toY: number, grid: Piece[][]): boolean {
		return moveLogic(x, y, toX, toY, grid, this.color);
	}
}

export default PiecePawn;
export { PiecePawn };
