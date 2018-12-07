import Piece from './piece';
import { bishop as moveLogic } from '../piece.logic';
import { PieceTypes, PieceColors } from '../../constants';

class PieceBishop extends Piece {
	constructor(color: PieceColors) {
		super(color, PieceTypes.BISHOP);
	}

	public canMove(x: number, y: number, toX: number, toY: number, grid: Piece[][]) {
		return moveLogic(x, y, toX, toY, grid);
	}
}

export default PieceBishop;
export { PieceBishop };
