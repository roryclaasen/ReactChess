import React, { Component } from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PieceComponent from './piece';
import SquareComponent from './boardsquare';
import Board, { SIZE as BoardSize } from '../../shared/board';

import './board.css';

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

	render() {
		const { board } = this.state;

		const rows = [];
		for (let y = 0; y < BoardSize + 1; y += 1) {
			const items = [];
			const rowKey = `row${y}`;
			for (let x = 0; x < BoardSize + 1; x += 1) {
				const itemKey = `${x},${y}`;
				if (y === 0 && x === 0) {
					items.push(
						<td
							className="cell"
							key={itemKey}
						/>
					);
				} else if (y === 0) {
					items.push(
						<td
							className="cell label"
							key={itemKey}
						>
							{String.fromCharCode(65 + x - 1)}
						</td>
					);
				} else if (x === 0) {
					items.push(
						<td
							className="cell label"
							key={itemKey}
						>
							{y}
						</td>
					);
				} else {
					const piece = board.pieceAt(x - 1, y - 1);
					items.push(
						<td
							className="cell grid"
							key={itemKey}
						>
							<SquareComponent
								move={this.move}
								canMove={board.canMove}
								x={x - 1}
								y={y - 1}
							>
								{piece !== undefined && (
									<PieceComponent
										piece={piece}
										x={x - 1}
										y={y - 1}
									/>
								)}
							</SquareComponent>
						</td>
					);
				}
			}
			rows.push(
				<tr
					className="row"
					key={rowKey}
				>
					{items}
				</tr>
			);
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

export default DragDropContext(HTML5Backend)(BoardComponent);
