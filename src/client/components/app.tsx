import * as React from 'react';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

import Grid from '@material-ui/core/Grid';
import GithubCorner from 'react-github-corner';

import ChessGame from '../../game';

import DisplayComponent from './display';

interface IAppState {
	chess: ChessGame;
}

const BACKEND = isMobile ? TouchBackend : HTML5Backend;

export default class MainApp extends React.Component<{}, IAppState> {
	constructor(props: any) {
		super(props);

		this.state = {
			chess: new ChessGame()
		};
	}

	render() {
		const { chess } = this.state;
		const gridClass = ['grid-main', 'background'];

		return (
			<React.Fragment>
				<Grid
					container={true}
					direction="column"
					justify="center"
					alignItems="center"
					className={gridClass.join(' ')}
				>
					<Grid item={true} xs={12}>
						<DragDropContextProvider backend={BACKEND as any}>
							<DisplayComponent
								chess={chess}
							/>
						</DragDropContextProvider>
					</Grid>
				</Grid>
				<GithubCorner
					href="https://github.com/roryclaasen/ReactChess"
					bannerColor="rgba(0, 0, 0, 0.75)"
					svgStyle={{ mixBlendMode: 'darken' }}
					octoColor="#fff"
					size={100}
					direction="right"
				/>
			</React.Fragment>
		);
	}
}
