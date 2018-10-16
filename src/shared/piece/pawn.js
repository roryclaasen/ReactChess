import Piece from './piece';

import { ItemTypes } from '../constants';

class PiecePawn extends Piece {
	constructor(itemType) {
		super(itemType, 'pawn');
	}

	canMove = (x, y, toX, toY) => {
		const dx = toX - x;
		const dy = toY - y;

		if (this.itemType === ItemTypes.WHITE && dy < 0) return false;
		if (this.itemType === ItemTypes.BLACK && dy > 0) return false;

		// TODO Can move two on first go
		// TODO Can take diagonal
		return Math.abs(dy) === 1 && Math.abs(dx) === 0;
	}
}

export default PiecePawn;
export { PiecePawn };
