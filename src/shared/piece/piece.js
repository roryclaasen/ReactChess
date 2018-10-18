export default class Piece {
	constructor(itemType, name) {
		this.itemType = itemType;
		this.name = name;
	}

	/* eslint-disable no-unused-vars */
	canMove = (x, y, toX, toY, grid) => {
		const { name } = this.name;
		// throw new Error(`Unimplemented method 'canMove()' for ${name} ${{ x, y, toX, toY }}`);
		return false;
	}
}
