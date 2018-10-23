import Piece from './piece';
import { Knight as moveLogic } from '../piece.logic';
import { PieceTypes } from '../constants';

class PieceKnight extends Piece {
	constructor(color) {
		super(color, PieceTypes.KNIGHT);
	}

	canMove = (x, y, toX, toY) => moveLogic(x, y, toX, toY);
}

export default PieceKnight;
export { PieceKnight };
