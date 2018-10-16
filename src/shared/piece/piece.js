export default class Piece {
	constructor(name) {
		this.name = name;
	}

	/* eslint-disable no-unused-vars */
	canMove = (x, y, toX, toY) => {
		const { name } = this.name;
		// throw new Error(`Unimplemented method 'canMove()' for ${name} ${{ x, y, toX, toY }}`);
		return false;
	}
}
