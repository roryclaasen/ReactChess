import Piece from './piece';

class PieceRook extends Piece {
	constructor(itemType) {
		super(itemType, 'rook');
	}

	canMove = (x, y, toX, toY, grid) => {
		const path = !(x !== toX && y !== toY);
		if (grid === undefined || !path) return path;
		// TODO Add Blocking
		return path;
	}
}

export default PieceRook;
export { PieceRook };
