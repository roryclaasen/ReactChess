import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { Link } from 'react-router-dom';

const PLAY_LINK = (props: any) => <Link to="/play" {...props} />;

export default class MenuComponent extends React.Component<{}, {}> {

	public render() {
		return (
			<Card>
				<CardContent>
					<Typography variant="h4" component="h2">
						Chess
					</Typography>
					<Typography variant="body1" component="p">
						Online chess game built using <a href="https://github.com/jhlywa/chess.js">chess.js</a>.
						Standard rules apply, <a href="https://www.chess.com/learn-how-to-play-chess">learn how to play chess</a>.
					</Typography>
					<Typography variant="h5" component="h3">
						Play Local
					</Typography>
					<Typography variant="body1" component="p">
						Pass and play against your opponent.<br />
						Current features:
						<ul>
							<li>Changing and copying game FEN</li>
							<li>Settings names of players</li>
						</ul>
					</Typography>
					<Typography variant="h5" component="h3">
						Play Online
					</Typography>
					<Typography variant="body1" component="p">
						Multiplayer mode coming soon
					</Typography>
				</CardContent>
				<CardActions>
					<Button component={PLAY_LINK} variant="outlined">
						Play Local
					</Button>
					<Button variant="outlined" disabled={true}>
						Play Online
					</Button>
				</CardActions>
			</Card>
		);
	}
}
