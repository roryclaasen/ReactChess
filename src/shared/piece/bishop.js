import Piece from './piece';

class PieceBishop extends Piece {
	constructor(itemType) {
		super(itemType, 'bishop');
	}

	canMove = (x, y, toX, toY, grid) => {
		const dx = Math.abs(toX - x);
		const dy = Math.abs(toY - y);

		if (dx === dy) {
			const dir = (toX - x) > 0 ? 1 : -1;

			let clear = true;
			for (let i = 0; i !== dx; i += 1) {
				const x1 = x + (i * dir);
				const y1 = x + (i * dir);

			}
			return clear;
		}
		return false;
	}
}

export default PieceBishop;
export { PieceBishop };
