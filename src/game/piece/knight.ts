import Piece from './piece';
import { knight as moveLogic } from '../piece.logic';
import { PieceTypes, PieceColors } from '../../constants';

class PieceKnight extends Piece {
	constructor(color: PieceColors) {
		super(color, PieceTypes.KNIGHT);
	}

	public canMove(x: number, y: number, toX: number, toY: number) {
		return moveLogic(x, y, toX, toY);
	}

	public copy(): Piece {
		return new PieceKnight(this.color);
	}
}

export default PieceKnight;
export { PieceKnight };
