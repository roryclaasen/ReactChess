import Piece from './piece';
import { king as moveLogic } from '../piece.logic';
import { PieceTypes, PieceColors } from '../../constants';

class PieceKing extends Piece {
	constructor(color: PieceColors) {
		super(color, PieceTypes.KING);
	}

	public canMove(x: number, y: number, toX: number, toY: number): boolean {
		return moveLogic(x, y, toX, toY);
	}
}

export default PieceKing;
export { PieceKing };
