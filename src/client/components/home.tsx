import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

export default class MainMenu extends React.Component<{}, {}> {
	public render() {
		const { children } = this.props;
		return (
			<Card>
				<CardContent>
					<Typography variant="h4">
						Chess
					</Typography>
				</CardContent>
				<CardActions>
					{children}
				</CardActions>
			</Card>
		);
	}
}
