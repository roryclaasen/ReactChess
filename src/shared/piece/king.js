import Piece from './piece';

class PieceKing extends Piece {
	constructor() {
		super('king');
	}

	canMove = (x, y, toX, toY) => {
		const dx = toX - x;
		const dy = toY - y;

		return !(Math.abs(dx) > 1 || Math.abs(dy) > 1);
	}
}

export default PieceKing;
export { PieceKing };
