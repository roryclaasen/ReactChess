import Piece from './piece';
import { Bishop as moveLogic } from '../piece.logic';
import { PieceTypes } from '../constants';

class PieceBishop extends Piece {
	constructor(color) {
		super(color, PieceTypes.BISHOP);
	}

	canMove = (x, y, toX, toY, grid) => moveLogic(x, y, toX, toY, grid);
}

export default PieceBishop;
export { PieceBishop };
