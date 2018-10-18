import Piece from './piece';

class PieceQueen extends Piece {
	constructor(itemType) {
		super(itemType, 'queen');
	}

	canMoveRook = (x, y, dx, dy, grid) => {
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

	canMoveBishop = (x, y, dx, dy, grid) => {
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

	canMove = (x, y, toX, toY, grid) => {
		const dx = toX - x;
		const dy = toY - y;
		const path = (Math.abs(dx) === Math.abs(dy)) || !(x !== toX && y !== toY);
		if (grid === undefined || !path) return path;
		const rook = !(x !== toX && y !== toY) && this.canMoveRook(x, y, dx, dy, grid);
		const bishop = Math.abs(dx) === Math.abs(dy) && this.canMoveBishop(x, y, dx, dy, grid);
		return rook || bishop;
	}
}

export default PieceQueen;
export { PieceQueen };
