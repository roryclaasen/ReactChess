import Piece from './piece';
import { Pawn as moveLogic } from '../piece.logic';
import { PieceTypes } from '../constants';

class PiecePawn extends Piece {
	constructor(color) {
		super(color, PieceTypes.PAWN);
	}

	canMove = (x, y, toX, toY, grid) => moveLogic(x, y, toX, toY, grid, this.color);
}

export default PiecePawn;
export { PiecePawn };
