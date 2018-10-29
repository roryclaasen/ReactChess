import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Board from '../../../shared/board';
import BoardComponent from './board.table';
import { WinnerState } from '../../../shared/constants';
import Options from '../../options.client';

export interface BoardRendererProps {
	board: Board;
	move: (x1: number, y1: number, x2: number, y2: number) => void;
	options: Options;
}

export default class BoardRenderer extends React.Component<BoardRendererProps, {}> {
	currentMessage = () => {
		const { board } = this.props;
		let message = `It's ${board.current.toLowerCase()}'s turn`;

		if (board.winner) {
			if (board.winner === WinnerState.STALEMATE) message = 'Stalemate!';
			else message = `Checkmate! ${board.winner.toLowerCase()} wins!`;
		}
		return message;
	}

	render() {
		const { board, move, options } = this.props;

		return (
			<Grid
				container={true}
				direction="column"
				spacing={16}
			>
				<Grid item={true}>
					<Card>
						<CardContent
							style={{
								paddingBottom: '16px',
								textAlign: 'center'
							}}
						>
							<Typography variant="h4">
								{this.currentMessage()}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item={true}>
					<Card>
						<BoardComponent
							board={board}
							move={move}
							options={options}
						/>
					</Card>
				</Grid>
			</Grid>
		);
	}
}
