import Piece from './piece';
import { Rook as moveLogic } from '../piece.logic';
import { PieceTypes } from '../constants';

class PieceRook extends Piece {
	constructor(itemType) {
		super(itemType, PieceTypes.ROOK);
	}

	canMove = (x, y, toX, toY, grid) => moveLogic(x, y, toX, toY, grid);
}

export default PieceRook;
export { PieceRook };
