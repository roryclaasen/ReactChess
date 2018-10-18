import Piece from './piece';

class PieceRook extends Piece {
	constructor(itemType) {
		super(itemType, 'rook');
	}

	canMove = (x, y, toX, toY, grid) => {
		const path = !(x !== toX && y !== toY);
		if (grid === undefined || !path) return path;
		const dx = toX - x;
		const dy = toY - y;

		let clear = true;
		const length = Math.max(Math.abs(dx), Math.abs(dy));
		let ox = 0;
		if (dx !== 0) ox = dx > 0 ? 1 : -1;
		let oy = 0;
		if (dy !== 0) oy = dy > 0 ? 1 : -1;
		for (let i = 1; i < length; i += 1) {
			const tx = x + (i * ox);
			const ty = y + (i * oy);
			if (grid[tx][ty] !== undefined) {
				clear = false;
			}
		}
		return clear;
	}
}

export default PieceRook;
export { PieceRook };
