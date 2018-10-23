import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BoardRenderer from './board.renderer';
import Board from '../../../shared/board';

export default class GameBoard extends Component {
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

	generateMove() {
		const { board } = this.props;

		const moves = [];
		for (let i = 0; i < board.moves.length; i += 1) {
			const move = board.moves[i].notation();
			moves.push(
				<ListItem
					key={`move${i}`}
					className="item"
					dense
				>
					<ListItemText
						primary={move[0]}
						className="text left"
					/>
					<ListItemText
						primary={move[1]}
						className="text right"
					/>
				</ListItem>
			);
		}
		return moves;
	}

	render() {
		const { board } = this.props;
		const { update } = this.state;
		return (
			<Grid
				container
				direction="row"
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
						<CardContent>
							<Typography variant="h5">
								Moves
							</Typography>
							<List
								key={`list ${update}`}
								className="list"
							>
								{this.generateMove()}
							</List>
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
						move={this.move}
						key={`board ${update}`}
					/>
				</Grid>
			</Grid>
		);
	}
}

GameBoard.propTypes = {
	board: PropTypes.instanceOf(Board).isRequired
};
