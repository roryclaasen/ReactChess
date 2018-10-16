import Piece from './piece';

class PieceQueen extends Piece {
	constructor(itemType) {
		super(itemType, 'queen');
	}

	canMove = (x, y, toX, toY) => {
		const dx = toX - x;
		const dy = toY - y;

		return (Math.abs(dx) === Math.abs(dy)) || !(x !== toX && y !== toY);
	}
}

export default PieceQueen;
export { PieceQueen };
