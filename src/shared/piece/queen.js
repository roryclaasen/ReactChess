import Piece from './piece';

class PieceQueen extends Piece {
	constructor(itemType) {
		super(itemType, 'queen');
	}

	canMove = (x, y, toX, toY, grid) => {
		const dx = toX - x;
		const dy = toY - y;
		const path = (Math.abs(dx) === Math.abs(dy)) || !(x !== toX && y !== toY);
		if (grid === undefined || !path) return path;
		// TODO Add Blocking
		return path;
	}
}

export default PieceQueen;
export { PieceQueen };
