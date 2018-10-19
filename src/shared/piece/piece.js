export default class Piece {
	constructor(itemType, pieceType) {
		this.itemType = itemType;
		this.pieceType = pieceType;
	}

	/* eslint-disable no-unused-vars */
	canMove = (x, y, toX, toY, grid) => {
		const { pieceType } = this.pieceType;
		// throw new Error(`Unimplemented method 'canMove()' for ${name} ${{ x, y, toX, toY }}`);
		return false;
	}
}
