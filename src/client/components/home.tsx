import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

export default class MainMenu extends React.Component<{}, {}> {
	public render() {
		const { children } = this.props;
		return (
			<React.Fragment>
				<Card>
					<CardMedia
						component="img"
						image="/static/images/banner.png"
						title="Chess"
						style={{ height: 140, objectFit: 'cover' }}
					/>
					<CardContent>
						<Typography variant="h4" gutterBottom={true}>
							Chess
						</Typography>
						<Typography variant="h6">
							How to play Chess
						</Typography>
						<Typography component="p" gutterBottom={true}>
							Visit <a href="https://www.chess.com/learn-how-to-play-chess">chess.com/learn-how-to-play-chess</a> for a detailed explanation on how to play chess.
						</Typography>
						<Typography variant="h5">
							Pass and Play
						</Typography>
						<Typography component="p" gutterBottom={true}>
							Take turns playing chess on this device
						</Typography>
						<Typography variant="h5">
							Play Online
						</Typography>
						<Typography component="p" gutterBottom={true}>
							Play online against an opponent
						</Typography>
					</CardContent>
					<CardActions>
						{children}
					</CardActions>
				</Card>
				<Card style={{ marginTop: '2em' }}>
					<CardContent style={{ paddingBottom: '16px' }}>
						<Typography component="p">
							This project is licensed under the MIT License - see the <a href="https://github.com/roryclaasen/ReactChess/blob/master/LICENSE">license file</a> for details
						</Typography>
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}
}
