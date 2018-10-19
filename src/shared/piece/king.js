import Piece from './piece';
import { King as moveLogic } from '../piece.logic';
import { PieceTypes } from '../constants';

class PieceKing extends Piece {
	constructor(itemType) {
		super(itemType, PieceTypes.KING);
	}

	canMove = (x, y, toX, toY) => moveLogic(x, y, toX, toY);
}

export default PieceKing;
export { PieceKing };
