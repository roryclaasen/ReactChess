import React, { Component } from 'react';
import Board, { SIZE as BoardSize } from '../../shared/board';

import './board.css';

export default class BoardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			board: new Board()
		};
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
					items.push(
						<td
							className="cell piece"
							key={itemKey}
						>
							{board.charAt(x - 1, y - 1)}
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
