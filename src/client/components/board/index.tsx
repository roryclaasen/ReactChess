import React from 'react';

import Card from '@material-ui/core/Card';

import ChessGame from '../../../game';

import SquareComponent from './square';
import PieceComponent from './piece';

import './board.scss';

interface IBoardProps {
	chess: ChessGame;
	update: () => void;
	flip?: boolean;
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
		if (move !== null) this.update();
		return move;
	}

	private update() {
		const { update } = this.state;
		this.setState({ update: update + 1 });
		this.props.update();
	}

	public render(): JSX.Element {
		const { update } = this.state;
		const { chess, flip } = this.props;
		return (
			<Card className="chess-card" style={{ backgroundColor: 'initial' }}>
				<table key={update} className="chess">
					<tbody>
						{chess.board(flip).map((row, y) => (
							<tr key={flip ? y : 7 - y}>
								{row.map((item, x) => (
									<SquareComponent
										key={x}
										chess={chess}
										x={x}
										y={flip ? y : 7 - y}
										flip={flip}
										move={this.handleMove}
									>
										{item !== null &&
											<PieceComponent
												piece={item}
												x={x}
												y={flip ? y : 7 - y}
											/>
										}
									</SquareComponent>
								))}
							</tr>
						))}
						{/* </DragDropContextProvider> */}
					</tbody>
				</table>
			</Card>
		);
	}
}
