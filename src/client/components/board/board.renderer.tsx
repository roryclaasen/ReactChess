import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ButtonBase from '@material-ui/core/ButtonBase';

import { PieceColors, PieceTypes, WinnerState } from '../../../constants';

import Board from '../../../game/board';
import BoardComponent from './board.table';
import Options from '../../options.client';
import manager from '../../pieces/manager';

export interface IBoardRendererProps {
	board: Board;
	move: (x1: number, y1: number, x2: number, y2: number) => void;
	promote: (type: PieceTypes) => void;
	options: Options;
}

export default class BoardRenderer extends React.Component<IBoardRendererProps, {}> {
	protected currentMessage = () => {
		const { board } = this.props;
		let message = `It's ${PieceColors[board.current]}'s turn`;

		if (board.winner) {
			if (board.winner === WinnerState.STALEMATE) message = 'Stalemate!';
			else message = `Checkmate! ${board.winner} wins!`;
		}
		return message;
	}

	private makeImageButton(type: PieceTypes) {
		const { board, promote } = this.props;
		console.log(board.upgradeWaiting);
		return (
			<Grid item={true}>
				<ButtonBase
					focusRipple={true}
					// tslint:disable-next-line
					onClick={() => promote(type)}
				>
					{manager.getImageJSX(board.upgradeWaiting.color, type)}
				</ButtonBase>
			</Grid>
		);
	}

	public render(): JSX.Element {
		const { board, move, options } = this.props;

		return (
			<React.Fragment>
				<Dialog disableBackdropClick={true} open={board.upgradeWaiting.waiting}>
					<DialogTitle>Pick a Piece to Upgrade Pawn to</DialogTitle>
					<DialogContent>
						<Grid
							container={true}
							direction="row"
							spacing={16}
						>
							{board.upgradeWaiting.waiting && (
								<React.Fragment>
									{this.makeImageButton(PieceTypes.BISHOP)}
									{this.makeImageButton(PieceTypes.KNIGHT)}
									{this.makeImageButton(PieceTypes.ROOK)}
									{this.makeImageButton(PieceTypes.QUEEN)}
								</React.Fragment>
							)}
						</Grid>
					</DialogContent>
				</Dialog>
				<Grid
					container={true}
					direction="column"
					spacing={16}
				>
					<Grid item={true}>
						<Card>
							<CardContent
								style={{
									paddingBottom: '16px',
									textAlign: 'center'
								}}
							>
								<Typography variant="h4">
									{this.currentMessage()}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item={true}>
						<Card>
							<BoardComponent
								board={board}
								move={move}
								options={options}
							/>
						</Card>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}
