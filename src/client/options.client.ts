import Sources from './pieces';

export interface AvalibleOptions {
	[key: string]: any;

	ShowBackground: boolean;
	Pieces: string;
	Board: string;
}

export default class Options {

	private defaultOptions: AvalibleOptions;
	private options: AvalibleOptions;
	constructor() {
		this.defaultOptions = {
			ShowBackground: true,
			Pieces: 'Default',
			Board: 'default'
		};

		this.options = this.copyOptions();
	}

	// Pieces

	public get pieces() {
		return this.options.Pieces;
	}

	public get piecesList() {
		return Object.keys(Sources);
	}

	// Board Colors

	public get board() {
		return this.options.Board;
	}

	public get boardList() {
		return ['default', 'brown', 'gray', 'wood'];
	}

	// Background

	public get showBackground() {
		return this.options.ShowBackground;
	}

	// Utils

	private copyOptions = () => (<any>Object).assign({}, this.defaultOptions);

	public changeOption(name: string, value: any) {
		if (!(name in this.options)) return;
		this.options[name] = value;
	}

	public reset = () => { this.options = this.copyOptions(); };
}
