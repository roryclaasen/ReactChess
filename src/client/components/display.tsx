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
}

export default class DisplayComponent extends React.Component<IDisplayProps, IDisplayState> {
	public render(): JSX.Element {
		const { chess } = this.props;
		return (
			<Grid
				item={true}
				container={true}
				direction="column"
				alignItems="center"
			>
				<Grid item={true}>
					<Card>
						<CardContent>
							<Typography variant="h5" component="h2">
								{chess.game.fen()}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item={true}>
					<BoardComponent
						chess={chess}
					/>
				</Grid>
			</Grid>
		);
	}
}
