import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Board from '../../../shared/board';
import BoardComponent from './board.table';
import { WinnerState } from '../../../shared/constants';

export default class BoardRenderer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			update: 0
		};
	}

	move = (x1, y1, x2, y2) => {
		const { board } = this.props;
		const { update } = this.state;

		board.move(x1, y1, x2, y2);

		this.setState({
			update: update + 1
		});
	}

	currentMessage = () => {
		const { board } = this.props;
		let message = `It's ${board.current}'s turn`;

		if (board.winner) {
			if (board.winner === WinnerState.STALEMATE) message = 'Stalemate!';
			else message = `Checkmate! ${board.winner} wins!`;
		}
		return message;
	}

	render() {
		const { board } = this.props;

		return (
			<Grid
				container
				direction="column"
				spacing={16}
			>
				<Grid item>
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
				<Grid item>
					<Card>
						<BoardComponent
							board={board}
							move={this.move}
						/>
					</Card>
				</Grid>
			</Grid>
		);
	}
}

BoardRenderer.propTypes = {
	board: PropTypes.instanceOf(Board).isRequired
};
