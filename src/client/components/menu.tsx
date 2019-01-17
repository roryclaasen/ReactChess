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
					<Typography variant="h5" component="h2">
						Chess
					</Typography>
					{/* TODO: Write Menu Page */}
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
