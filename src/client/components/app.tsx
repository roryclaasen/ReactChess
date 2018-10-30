import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import GithubCorner from 'react-github-corner';

import Board from '../../shared/board';
import GameBoard from './board/board.game';
import Options from '../options.client';
import OptionsModal from './options';
import MainMenu from './home';

export enum MainAppStage {
	MENU, ONLINE, LOCAL
}

export interface MainAppState {
	options: Options;
	optionsOpen: boolean;
	board: Board;
	update: number;
	stage: MainAppStage;
}

export default class MainApp extends React.Component<{}, MainAppState> {
	constructor(props: any) {
		super(props);

		this.state = {
			options: new Options(),
			optionsOpen: false,
			board: new Board(),
			update: 0,
			stage: MainAppStage.MENU
		};
	}

	private updateOptions = (options: Options) => {
		const { update } = this.state;
		this.setState({
			options,
			update: update + 1
		});
	}

	private showOptions = () => {
		this.setState({ optionsOpen: true });
	}

	private closeOptions = () => {
		this.setState({ optionsOpen: false });
	}

	private mainMenu = () => {
		this.setState({ stage: MainAppStage.MENU });
	}

	private playLocal = () => {
		this.setState({ stage: MainAppStage.LOCAL, board: new Board() });
	}

	private newGanme = () => {
		this.setState({ board: new Board() });
	}

	public render() {
		const { board, options, optionsOpen, update, stage } = this.state;
		// TODO Menu & UI
		const gridClass = ['grid-main'];
		if (options.showBackground) gridClass.push('background');

		let currentStage;
		switch (stage) {
			case MainAppStage.MENU: {
				currentStage = (
					<MainMenu>
						<Button
							size="small"
							variant="outlined"
							onClick={this.showOptions}
						>
							Options
						</Button>
						<Button
							size="small"
							variant="outlined"
							onClick={this.playLocal}
						>
							Pass and Play
						</Button>
						<Button
							size="small"
							disabled={true}
							variant="outlined"
						>
							Play Online
						</Button>
					</MainMenu>
				);
				break;
			}
			case MainAppStage.LOCAL: {
				currentStage = (
					<GameBoard
						board={board}
						options={options}
						key={`board ${update}`}
					>
						<Grid container={true} spacing={8}>
							<Grid item={true} xs={12}>
								<Button
									size="small"
									variant="outlined"
									onClick={this.showOptions}
								>
									Options
								</Button>
							</Grid>
							<Grid item={true} xs={6}>
								<Button
									size="small"
									color="secondary"
									variant="outlined"
									onClick={this.newGanme}
								>
									New Game
								</Button>
							</Grid>
							<Grid item={true} xs={6}>
								<Button
									size="small"
									color="primary"
									variant="outlined"
									onClick={this.mainMenu}
								>
									Main Menu
								</Button>
							</Grid>
						</Grid>
					</GameBoard>
				);
				break;
			}
			default: {
				currentStage = <React.Fragment />;
				break;
			}
		}

		return (
			<React.Fragment>
				<Grid
					container={true}
					direction="column"
					justify="center"
					alignItems="center"
					className={gridClass.join(' ')}
				>
					<Grid item={true}>
						{currentStage}
					</Grid>
				</Grid>
				<OptionsModal
					options={options}
					open={optionsOpen}
					close={this.closeOptions}
					updateOptions={this.updateOptions}
				/>
				<GithubCorner
					href="https://github.com/roryclaasen/ReactChess"
					bannerColor="rgba(0, 0, 0, 0.5)"
					octoColor="#fff"
					size={100}
					direction="right"
				/>
			</React.Fragment>
		);
	}
}
