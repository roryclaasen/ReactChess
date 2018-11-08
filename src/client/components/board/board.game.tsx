import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BoardRenderer from './board.renderer';
import Board from '../../../shared/board';
import Options from '../../options.client';

export interface GameBoardProps {
	board: Board;
	options: Options;
}

export interface GameBoardState {
	update: number;
}

export default class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
	constructor(props: GameBoardProps) {
		super(props);

		this.state = {
			update: 0
		};
	}

	private move = (x1: number, y1: number, x2: number, y2: number) => {
		const { board } = this.props;
		const { update } = this.state;

		board.move(x1, y1, x2, y2);

		this.setState({
			update: update + 1
		});
	}

	private generateMove() {
		const { board } = this.props;

		const moves = [];
		for (let i = 0; i < board.moves.length; i += 1) {
			const move = board.moves[i].notation;
			moves.push(
				<ListItem
					key={`move${i}`}
					className="item"
					dense={true}
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

	public render() {
		const { board, children, options } = this.props;
		const { update } = this.state;
		return (
			<Grid
				container={true}
				direction="row"
				spacing={32}
			>
				<Grid item={true}>
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
							{children}
						</CardActions>
					</Card>
				</Grid>
				<Grid item={true}>
					<BoardRenderer
						board={board}
						move={this.move}
						key={`board ${update}`}
						options={options}
					/>
				</Grid>
			</Grid>
		);
	}
}
