import Piece from './piece';

class PieceKnight extends Piece {
	constructor(itemType) {
		super(itemType, 'knight');
	}

	canMove = (x, y, toX, toY) => {
		const dx = toX - x;
		const dy = toY - y;

		return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
	}
}

export default PieceKnight;
export { PieceKnight };
