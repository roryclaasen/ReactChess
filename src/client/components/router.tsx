import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import ChessGame from '../../game';

import MenuComponent from './menu';
import DisplayComponent from './display';

export default class AppRouter extends React.Component<{}, {}> {

	private displayComponent = () => (<DisplayComponent chess={new ChessGame()} />);

	public render() {
		return (
			<Router>
				<React.Fragment>
					<Switch>
						<Route exact={true} path="/" component={MenuComponent} />
						<Route exact={true} path="/play" component={this.displayComponent} />
						<Redirect to="/" />
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}
