import * as React from 'react';

import ChessGame from '../../../game';

import './board.scss';

interface IBoardProps {
	chess: ChessGame;
}

export default class BoardComponent extends React.Component<IBoardProps, {}> {
	private table(): JSX.Element {
		const { chess } = this.props;
		return (
			<table className="chess">
				<tbody>
					{chess.board().map((row, y) => (
						<tr key={y}>
							{row.map((item, x) => (
								<td key={x} className={['color', chess.boardColor(x, y)].join(' ')}>
									{y === 7 &&
										<span className="note x">{chess.actual(x, y).x}</span>
									}
									{x === 0 &&
										<span className="note y">{chess.actual(x, y).y}</span>
									}
									{item !== null &&
										<span>{item.type}, {item.color}</span>
									}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	public render(): JSX.Element {
		return (
			<div>
				{this.table()}
			</div>
		);
	}
}
