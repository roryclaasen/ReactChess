export default class Piece {
	constructor(name) {
		this.name = name;
	}

	availableMoves() {
		const { name } = this.name;
		throw new Error(`Unimplemented method 'availableMoves()' for ${name}`);
	}
}
