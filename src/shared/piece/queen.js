import Piece from './piece';
import { Queen as moveLogic } from '../piece.logic';
import { PieceTypes } from '../constants';

class PieceQueen extends Piece {
	constructor(itemType) {
		super(itemType, PieceTypes.QUEEN);
	}

	canMove = (x, y, toX, toY, grid) => moveLogic(x, y, toX, toY, grid);
}

export default PieceQueen;
export { PieceQueen };
