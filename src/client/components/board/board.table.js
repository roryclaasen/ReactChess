import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PieceComponent from './board.piece';
import SquareComponent from './board.square';
import Board from '../../../shared/board';
import { BoardSize } from '../../../shared/constants';

import './board.scss';
import Options from '../../options.client';

class BoardComponent extends Component {
	makeItem(x, y) {
		const { board, move } = this.props;
		const itemKey = `${x},${y}`;
		if ((y === -1 && (x === -1 || x === BoardSize)) || (y === BoardSize && (x === -1 || x === BoardSize))) {
			return (
				<td
					className="cell"
					key={itemKey}
				/>
			);
		}
		if (y === -1 || y === BoardSize) {
			return (
				<td
					className="cell label"
					key={itemKey}
				>
					{String.fromCharCode(65 + x)}
				</td>
			);
		}
		if (x === -1 || x === BoardSize) {
			return (
				<td
					className="cell label"
					key={itemKey}
				>
					{y + 1}
				</td>
			);
		}
		const piece = board.pieceAt(x, y);
		const cellClassName = `cell grid ${((x + y) % 2 === 1) ? 'black' : 'white'}`;
		return (
			<td
				className={cellClassName}
				key={itemKey}
			>
				<SquareComponent
					move={move}
					canMove={(x1, y1, x2, y2) => {
						if (board.isTurn(x1, y1)) return board.canMove(x1, y1, x2, y2);
						return false;
					}}
					x={x}
					y={y}
				>
					{piece !== undefined && (
						<PieceComponent
							piece={piece}
							x={x}
							y={y}
						/>
					)}
				</SquareComponent>
			</td>
		);
	}

	makeRow(y) {
		const items = [];
		const rowKey = `row${y}`;
		for (let x = -1; x < BoardSize + 1; x += 1) {
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

	render() {
		const { fliped, options } = this.props;
		const rows = [];
		if (fliped) {
			for (let y = BoardSize; y >= -1; y -= 1) {
				rows.push(this.makeRow(y));
			}
		} else {
			for (let y = -1; y < BoardSize + 1; y += 1) {
				rows.push(this.makeRow(y));
			}
		}
		const className = ['chessboard', options.Board()];
		return (
			<table className={className.join(' ')}>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}

BoardComponent.propTypes = {
	fliped: PropTypes.bool,
	board: PropTypes.instanceOf(Board).isRequired,
	move: PropTypes.func.isRequired,
	options: PropTypes.instanceOf(Options).isRequired
};

BoardComponent.defaultProps = {
	fliped: true
};

export default DragDropContext(HTML5Backend)(BoardComponent);
