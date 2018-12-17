import * as React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PieceComponent from './board.piece';
import SquareComponent from './board.square';
import Board from '../../../game/board';
import { BOARD_SIZE } from '../../../constants';

import './board.scss';
import Options from '../../options.client';

export interface IBoardComponentProps {
	fliped?: Boolean;
	board: Board;
	move: (x1: number, y1: number, x2: number, y2: number) => void;
	options: Options;
}

@DragDropContext(HTML5Backend)
export default class BoardComponent extends React.Component<IBoardComponentProps, {}> {
	public static defaultProps: Partial<IBoardComponentProps> = {
		fliped: true
	};

	private canMove = (x1: number, y1: number, x2: number, y2: number): boolean => {
		const { board } = this.props;
		if (board.isTurn(x1, y1)) return board.canMove(x1, y1, x2, y2);
		return false;
	}

	private makeItem(x: number, y: number): JSX.Element {
		const { board, move } = this.props;
		const itemKey = `${x},${y}`;
		if ((y === -1 && (x === -1 || x === BOARD_SIZE)) || (y === BOARD_SIZE && (x === -1 || x === BOARD_SIZE))) {
			return (
				<td
					className="cell"
					key={itemKey}
				/>
			);
		}
		if (y === -1 || y === BOARD_SIZE) {
			return (
				<td
					className="cell label"
					key={itemKey}
				>
					{String.fromCharCode(65 + x)}
				</td>
			);
		}
		if (x === -1 || x === BOARD_SIZE) {
			return (
				<td
					className="cell label"
					key={itemKey}
				>
					{y + 1}
				</td>
			);
		}
		const piece = board.grid[x][y];
		const cellClassName = `cell grid ${((x + y) % 2 === 1) ? 'black' : 'white'}`;
		return (
			<td
				className={cellClassName}
				key={itemKey}
			>
				<SquareComponent
					move={move}
					canMove={this.canMove}
					x={x}
					y={y}
				>
					{piece !== undefined && (
						<PieceComponent
							piece={piece}
							x={x}
							y={y}
							isTurn={board.isTurn(x, y)}
						/>
					)}
				</SquareComponent>
			</td>
		);
	}

	private makeRow(y: number): JSX.Element {
		const items = [];
		const rowKey = `row${y}`;
		for (let x = -1; x < BOARD_SIZE + 1; x += 1) {
			items.push(this.makeItem(x, y));
		}
		return (
			<tr
				className="row"
				key={rowKey}
			>
				{items}
			</tr>
		);
	}

	public render(): JSX.Element {
		const { fliped, options } = this.props;
		const rows = [];
		if (fliped) {
			for (let y = BOARD_SIZE; y >= -1; y -= 1) {
				rows.push(this.makeRow(y));
			}
		} else {
			for (let y = -1; y < BOARD_SIZE + 1; y += 1) {
				rows.push(this.makeRow(y));
			}
		}
		const className = ['chessboard', options.board];
		return (
			<table className={className.join(' ')}>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}
