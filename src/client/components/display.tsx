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
		return (
			<Grid
				item={true}
				container={true}
				direction="column"
				alignItems="center"
				spacing={8}
			>
				<Grid item={true}>
					<Card>
						<CardContent>
							<Typography variant="h5" component="h2" key={`fen${update}`}>
								{chess.game.fen()}
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
