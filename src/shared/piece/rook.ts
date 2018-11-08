import Piece from './piece';
import { rook as moveLogic } from '../piece.logic';
import { PieceTypes, PieceColors } from '../constants';

class PieceRook extends Piece {
	constructor(color: PieceColors) {
		super(color, PieceTypes.ROOK);
	}

	public canMove(x: number, y: number, toX: number, toY: number, grid: Piece[][]): boolean {
		return moveLogic(x, y, toX, toY, grid);
	}
}

export default PieceRook;
export { PieceRook };
