import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import GithubCorner from 'react-github-corner';

import Board from '../../shared/board';
import GameBoard from './board/board.game';
import Options from '../options.client';
import OptionsModal from './options';

export default class MainApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: new Options(),
			optionsOpen: false,
			board: new Board(),
			update: 0
		};
	}

	updateOptions = (options) => {
		const { update } = this.state;
		this.setState({
			options,
			update: update + 1
		});
	}

	render() {
		const { board, options, optionsOpen, update } = this.state;
		// TODO Menu & UI
		const gridClass = ['grid-main'];
		if (options.ShowBackground()) gridClass.push('background');
		return (
			<Fragment>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					className={gridClass.join(' ')}
				>
					<Grid item>
						<GameBoard
							board={board}
							options={options}
							key={`board ${update}`}
						>
							<Grid container spacing={8}>
								<Grid item xs={12}>
									<Button
										size="small"
										variant="outlined"
										onClick={() => {
											this.setState({ optionsOpen: true });
										}}
									>
										Options
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										size="small"
										color="secondary"
										variant="outlined"
										onClick={() => this.setState({ board: new Board() })}
									>
										New Game
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										size="small"
										color="primary"
										variant="outlined"
										disabled
									>
										Main Menu
									</Button>
								</Grid>
							</Grid>
						</GameBoard>
					</Grid>
				</Grid>
				<OptionsModal
					options={options}
					open={optionsOpen}
					close={() => this.setState({ optionsOpen: false })}
					updateOptions={this.updateOptions}
				/>
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
