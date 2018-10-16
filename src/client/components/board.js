import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PieceComponent from './piece';
import SquareComponent from './boardsquare';
import Board, { SIZE as BoardSize } from '../../shared/board';

import './board.scss';

class BoardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			board: new Board()
		};
	}

	move = (x1, y1, x2, y2) => {
		const { board } = this.state;
		board.move(x1, y1, x2, y2);
		this.setState({ board });
	}

	makeItem(x, y) {
		const { board } = this.state;
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
		return (
			<td
				className="cell grid"
				key={itemKey}
			>
				<SquareComponent
					move={this.move}
					canMove={board.canMove}
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
		const { fliped } = this.props;
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
		return (
			<table className="chessboard">
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}

BoardComponent.propTypes = {
	fliped: PropTypes.bool
};

BoardComponent.defaultProps = {
	fliped: true
};

export default DragDropContext(HTML5Backend)(BoardComponent);
