import PieceManager from './pieces/manager';

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

		this.load();
		this.save();
	}

	// Pieces

	public get pieces() {
		return this.options.Pieces;
	}

	public get piecesList() {
		return PieceManager.keys;
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
		this.save();
	}

	public reset = () => {
		this.options = this.copyOptions();
		this.save();
	}

	public save(): void {
		if (window.localStorage) {
			Object.keys(this.options).forEach((key) => {
				window.localStorage.setItem(key, this.options[key]);
			});
		}
	}

	public load(): void {
		if (window.localStorage) {
			Object.keys(this.options).forEach((key) => {
				const data = window.localStorage.getItem(key);
				if (data !== null) {
					this.options[key] = data;
				}
			});
		}
	}
}
