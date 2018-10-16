import Piece from './piece';

class PiecePawn extends Piece {
	constructor(itemType) {
		super(itemType, 'pawn');
	}

	canMove = (x, y, toX, toY) => {
		const dx = toX - x;
		const dy = toY - y;

		// TODO Only forward
		// TODO Can move two on first go
		// TODO Can take diagonal
		return Math.abs(dy) === 1 && Math.abs(dx) === 0;
	}
}

export default PiecePawn;
export { PiecePawn };
