import Sources from './pieces';

export default class Options {
	constructor() {
		this.DefaultOptions = {
			ShowBackground: true,
			Pieces: 'Default',
			Board: 'default'
		};

		this.options = this.copyOptions();
	}

	// Pieces

	Pieces = () => this.options.Pieces;

	PiecesList = () => Object.keys(Sources);

	// Board Colors

	Board = () => this.options.Board;

	BoardList = () => ['default', 'brown', 'gray'];

	// Background

	ShowBackground = () => this.options.ShowBackground;

	// Utils

	copyOptions = () => Object.assign({}, this.DefaultOptions);

	changeOption(name, value) {
		if (!(name in this.options)) return;
		this.options[name] = value;
	}

	reset = () => { this.options = this.copyOptions(); };
}
