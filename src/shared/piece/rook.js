import Piece from './piece';

class PieceRook extends Piece {
	constructor() {
		super('rook');
	}

	canMove = (x, y, toX, toY) => !(x !== toX && y !== toY);
}

export default PieceRook;
export { PieceRook };
