import Piece from './piece';

class PieceRook extends Piece {
	constructor(itemType) {
		super(itemType, 'rook');
	}

	canMove = (x, y, toX, toY, grid) => {
		const path = !(x !== toX && y !== toY);
		if (grid === undefined || !path) return path;

		let clear = true;
		let took = false;
		if (x === toX) {
			const yStart = Math.min(y, toY);
			const yEnd = Math.max(y, toY);
			for (let y1 = yStart; y1 < yEnd; y1 += 1) {
				if (!clear) continue;
				if (y1 === y) continue;
				if (grid[x][y1] !== undefined) {
					if (grid[x][y1].itemType === grid[x][y].itemType) clear = false;
					if (took) clear = false;
					took = true;
				}
			}
		}
		// TODO FIX THIS
		return clear;
	}
}

export default PieceRook;
export { PieceRook };
