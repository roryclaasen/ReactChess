import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';

import GithubCorner from 'react-github-corner';

import Board from '../../shared/board';
import GameBoard from './board';

export default class MainApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			board: new Board()
		};
	}

	render() {
		const { board } = this.state;
		// TODO Menu & UI
		return (
			<Fragment>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					className="grid-main"
				>
					<Grid item>
						<GameBoard
							board={board}
							newGame={() => this.setState({ board: new Board() })}
						/>
					</Grid>
				</Grid>
				<GithubCorner
					href="https://github.com/roryclaasen/ReactChess"
					bannerColor="rgba(0, 0, 0, 0.5)"
					octoColor="#fff"
					size={100}
					direction="right"
				/>
			</Fragment>
		);
	}
}
