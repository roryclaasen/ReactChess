import React from 'react';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card from '@material-ui/core/Card';

import ChessGame from '../../../game';

import SquareComponent from './square';
import PieceComponent from './piece';

import './board.scss';

interface IBoardProps {
	chess: ChessGame;
}

interface IBoardState {
	update: number;
}

export default class BoardComponent extends React.Component<IBoardProps, IBoardState> {
	constructor(props: IBoardProps) {
		super(props);

		this.state = {
			update: 0
		};
	}

	private handleMove = (x1: number, y1: number, x2: number, y2: number) => {
		const { chess } = this.props;
		const move = chess.move(x1, y1, x2, y2);
		this.update();
		return move;
	}

	private update() {
		const { update } = this.state;
		this.setState({ update: update + 1 });
	}

	public render(): JSX.Element {
		const { update } = this.state;
		const { chess } = this.props;
		return (
			<Card className="chess-card">
				<table key={update} className="chess">
					<tbody>
						<DragDropContextProvider backend={HTML5Backend}>
							{chess.board().map((row, y) => (
								<tr key={7 - y}>
									{row.map((item, x) => (
										<SquareComponent
											key={x}
											chess={chess}
											x={x}
											y={7 - y}
											move={this.handleMove}
										>
											{item !== null &&
												<PieceComponent
													piece={item}
													x={x}
													y={7 - y}
												/>
											}
										</SquareComponent>
									))}
								</tr>
							))}
						</DragDropContextProvider>
					</tbody>
				</table>
			</Card>
		);
	}
}
