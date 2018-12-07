import Piece from './piece';
import { queen as moveLogic } from '../piece.logic';
import { PieceTypes, PieceColors } from '../../constants';

class PieceQueen extends Piece {
	constructor(color: PieceColors) {
		super(color, PieceTypes.QUEEN);
	}

	public canMove(x: number, y: number, toX: number, toY: number, grid: Piece[][]): boolean {
		return moveLogic(x, y, toX, toY, grid);
	}
}

export default PieceQueen;
export { PieceQueen };
