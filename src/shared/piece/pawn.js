import Piece from './piece';

import { ItemTypes } from '../constants';

class PiecePawn extends Piece {
	constructor(itemType) {
		super(itemType, 'pawn');
	}

	canMove = (x, y, toX, toY, grid) => {
		const dx = toX - x;
		const dy = toY - y;

		if (this.itemType === ItemTypes.WHITE && dy < 0) return false;
		if (this.itemType === ItemTypes.BLACK && dy > 0) return false;

		const moveTwo = y === 1 || y === 6;

		const path = (Math.abs(dy) === 1 || (moveTwo && Math.abs(dy) === 2)) && Math.abs(dx) === 0;
		if (grid === undefined) return path;
		if (path) return grid[toX][toY] === undefined;
		if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
			return grid[toX][toY] !== undefined;
		}
		return false;
	}
}

export default PiecePawn;
export { PiecePawn };
