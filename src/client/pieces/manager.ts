import * as DefaultBlackBishop from './default/b_bishop.png';
import * as DefaultBlackKing from './default/b_king.png';
import * as DefaultBlackKnight from './default/b_knight.png';
import * as DefaultBlackQueen from './default/b_queen.png';
import * as DefaultBlackPawn from './default/b_pawn.png';
import * as DefaultBlackRook from './default/b_rook.png';

import * as DefaultWhiteBishop from './default/w_bishop.png';
import * as DefaultWhiteKing from './default/w_king.png';
import * as DefaultWhiteKnight from './default/w_knight.png';
import * as DefaultWhiteQueen from './default/w_queen.png';
import * as DefaultWhitePawn from './default/w_pawn.png';
import * as DefaultWhiteRook from './default/w_rook.png';

interface PieceList {
	[key: string]: string;

	BISHOP: string;
	KING: string;
	KNIGHT: string;
	QUEEN: string;
	PAWN: string;
	ROOK: string;
}

interface PieceSet {
	[key: string]: PieceList;

	BLACK: PieceList;
	WHITE: PieceList;
}

function str(src: any): string {
	return src as string;
}

class PieceManager {
	private source: { [key: string]: PieceSet };
	private currentKey: string;

	constructor() {
		this.source = {};

		this.addSet('Default', {
			BLACK: {
				BISHOP: str(DefaultBlackBishop),
				KING: str(DefaultBlackKing),
				KNIGHT: str(DefaultBlackKnight),
				QUEEN: str(DefaultBlackQueen),
				PAWN: str(DefaultBlackPawn),
				ROOK: str(DefaultBlackRook)
			},
			WHITE: {
				BISHOP: str(DefaultWhiteBishop),
				KING: str(DefaultWhiteKing),
				KNIGHT: str(DefaultWhiteKnight),
				QUEEN: str(DefaultWhiteQueen),
				PAWN: str(DefaultWhitePawn),
				ROOK: str(DefaultWhiteRook)
			}
		});

		this.currentKey = this.keys[0];
	}

	public get current(): PieceSet {
		return this.source[this.currentKey];
	}

	public get keys(): string[] {
		return Object.keys(this.source);
	}

	public changeCurrent(key: string): void {
		if (!(key in this.keys)) return;
		this.currentKey = key;
	}

	public getImageDataString(color: string, type: string): string {
		return this.current[color][type];
	}

	public getImageElement(color: string, type: string): HTMLImageElement {
		const image = new Image();
		image.src = this.getImageDataString(color, type);
		return image;
	}

	private addSet(key: string, set: PieceSet): void {
		this.source[key] = set;
	}
}

const manager = new PieceManager();
export default manager as PieceManager;
