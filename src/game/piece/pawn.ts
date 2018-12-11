import Piece from './piece';
import { pawn as moveLogic } from '../piece.logic';
import { PieceTypes, PieceColors } from '../../constants';

class PiecePawn extends Piece {

	public allowEnPassant: boolean = false;

	constructor(color: PieceColors) {
		super(color, PieceTypes.PAWN);
	}

	public canMove(x: number, y: number, toX: number, toY: number, grid: Piece[][]): boolean {
		return moveLogic(x, y, toX, toY, grid, this.color);
	}

	public copy(): Piece {
		const piece = new PiecePawn(this.color);
		piece.allowEnPassant = this.allowEnPassant;
		return piece;
	}
}

export default PiecePawn;
export { PiecePawn };
