import Piece from './piece';

class PieceBishop extends Piece {
	constructor(itemType) {
		super(itemType, 'bishop');
	}

	canMove = (x, y, toX, toY, grid) => {
		const dx = toX - x;
		const dy = toY - y;
		const path = (Math.abs(dx) === Math.abs(dy));
		if (grid === undefined || !path) return path;
		// TODO Add Blocking
		return path;
	}
}

export default PieceBishop;
export { PieceBishop };
