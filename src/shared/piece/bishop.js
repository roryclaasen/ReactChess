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

		let clear = true;
		const length = Math.abs(dx);
		const ox = dx > 0 ? 1 : -1;
		const oy = dy > 0 ? 1 : -1;
		for (let i = 1; i < length; i += 1) {
			const tx = x + (i * ox);
			const ty = y + (i * oy);
			if (grid[tx][ty] !== undefined) clear = false;
		}
		return clear;
	}
}

export default PieceBishop;
export { PieceBishop };
