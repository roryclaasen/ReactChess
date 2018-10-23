import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BoardRenderer from './board.renderer';
import Board from '../../../shared/board';

export default class GameBoard extends Component {
	render() {
		const { board } = this.props;
		return (
			<Grid
				container
				direction="row"
				// justify="center"
				// alignItems="center"
				spacing={32}
			>
				<Grid item>
					<Card
						className="game-info-panel"
					>
						<CardContent>
							<Typography variant="h4">
								Chess
							</Typography>
						</CardContent>
						<CardActions
							className="panel-actions"
						>
							<Button
								size="small"
								color="secondary"
								variant="outlined"
							>
								New Game
							</Button>
							<Button
								size="small"
								color="primary"
								variant="outlined"
							>
								Main Menu
							</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item>
					<BoardRenderer
						board={board}
					/>
				</Grid>
			</Grid>
		);
	}
}

GameBoard.propTypes = {
	board: PropTypes.instanceOf(Board).isRequired
};
