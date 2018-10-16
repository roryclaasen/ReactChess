import Piece from './piece';

class PieceBishop extends Piece {
	constructor() {
		super('bishop');
	}

	canMove = (x, y, toX, toY) => {
		const dx = toX - x;
		const dy = toY - y;

		return (Math.abs(dx) === Math.abs(dy));
	}
}

export default PieceBishop;
export { PieceBishop };
