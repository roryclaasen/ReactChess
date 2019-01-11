import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import BoardComponent from './board';
import ChessGame from '../../game';

interface IDisplayProps {
	chess: ChessGame;
}

interface IDisplayState {
	update: number;
}

export default class DisplayComponent extends React.Component<IDisplayProps, IDisplayState> {
	constructor(props: IDisplayProps) {
		super(props);

		this.state = {
			update: 0
		};

		this.update = this.update.bind(this);
	}

	public update = () => {
		const { update } = this.state;
		this.setState({
			update: update + 1
		});
	}

	public render(): JSX.Element {
		const { chess } = this.props;
		const { update } = this.state;
		const header = chess.instance.header();
		let turn = `It is ${chess.turn()}'s turn`;
		const turnInfo = [`You are ${chess.turnColor()}`] as string[];

		if (chess.instance.game_over()) {
			turn = 'Game over';
			if (chess.instance.in_check()) {
				turn += ', ';
				if (chess.turnColor() === 'White') turn += chess.opponent();
				else turn += chess.turn();
				turn += ' Wins!';
			} else turn += `, ${chess.turn()} wins`;
			if (chess.instance.in_draw()) turn = 'Draw!';
		}

		if (chess.instance.in_checkmate()) turnInfo.push('Checkmate');
		else if (chess.instance.in_check()) turnInfo.push('You are in check');
		if (chess.instance.in_stalemate()) turnInfo.push('Stalemate');

		return (
			<Grid
				item={true}
				container={true}
				direction="column"
				alignItems="center"
				spacing={8}
			>
				<Grid item={true} style={{ width: '100%' }}>
					<Card key={`card${update}`}>
						<CardContent>
							<Typography color="textSecondary">
								{header.date}
							</Typography>
							<Typography variant="h5" component="h2">
								{turn}
							</Typography>
							<Typography component="p">
								{turnInfo.join(', ')}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item={true}>
					<BoardComponent
						chess={chess}
						update={this.update}
					/>
				</Grid>
			</Grid>
		);
	}
}
