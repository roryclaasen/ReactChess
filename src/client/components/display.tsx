import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BoardComponent from './board';
import ChessGame from '../../game';

import DialogMessage, { IDialogOptions } from './dialog-message';

interface IDisplayProps {
	chess: ChessGame;
}

interface IDisplayState {
	update: number;
	expand: {
		[key: string]: string | undefined;
		game: string | undefined;
	};
	dialog: IDialogOptions;
}

export default class DisplayComponent extends React.Component<IDisplayProps, IDisplayState> {
	constructor(props: IDisplayProps) {
		super(props);

		this.state = {
			update: 0,
			expand: {
				game: undefined
			},
			dialog: {
				open: false,
				title: '',
				agree: 'Agree',
				message: ''
			}
		};

		this.update = this.update.bind(this);
		this.newGame = this.newGame.bind(this);
		this.closeDialogAndUpdate = this.closeDialogAndUpdate.bind(this);
	}

	public update = () => {
		const { update } = this.state;
		this.setState({
			update: update + 1
		});
	}

	public closeDialogAndUpdate = (options: IDialogOptions) => {
		const { update } = this.state;
		this.setState({
			update: update + 1,
			dialog: options
		});

		// FIXME: STOP THE DIALOG FROM REOPING AFTER PIECE MOVE!!!
	}

	private nameChange = (name: 'White' | 'Black') => (event: any) => {
		const { chess } = this.props;
		chess.setName(name, event.target.value);
		this.update();
	}

	private expandChange = (panel: string) => (event: any, isExpanded: boolean) => this.setState({
		expand: {
			game: isExpanded ? panel : undefined
		}
	})

	private newGame = (fen?: string) => {
		const { chess } = this.props;
		chess.newGame(fen);
		this.update();
	}

	public render(): JSX.Element {
		const { chess } = this.props;
		const { update, expand, dialog } = this.state;
		const header = chess.instance.header();
		let turn = `It is ${chess.turn()}'s turn`;
		const turnInfo = [`You are ${chess.turnColor()}`] as string[];

		if (chess.instance.game_over()) {
			turn = 'Game over';

			// TODO: Test this works as expected
			if (chess.instance.in_check()) turn += `, ${chess.opponent()} Wins!`;
			else turn += `, ${chess.turn()} wins`;
			if (chess.instance.in_draw()) turn = 'Draw!';
		}

		if (chess.instance.in_checkmate()) turnInfo.push('Checkmate');
		else if (chess.instance.in_check()) turnInfo.push('You are in check');
		if (chess.instance.in_stalemate()) turnInfo.push('Stalemate');

		return (
			<Grid
				container={true}
				direction="column"
				alignItems="center"
				spacing={16}
			>
				<DialogMessage all={dialog} key={`dialog${update}`} />
				<Grid item={true} xs={12} style={{ width: '100%' }}>
					<Card key={`card${update}`}>
						<CardContent>
							<Typography color="textSecondary">
								{header.date}
							</Typography>
							<Typography variant="h5" component="h2">
								{turn}
							</Typography>
							<Typography component="p">
								{turnInfo.join(', ')}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item={true}>
					<BoardComponent
						chess={chess}
						update={this.update}
					/>
				</Grid>
				<Grid item={true} xs={12}>
					<ExpansionPanel expanded={expand.game === 'options'} onChange={this.expandChange('options')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>Game Options</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Grid container={true} spacing={8}>
								<Grid item={true} xs={'auto'}>
									<TextField
										id="outlined-name"
										label="White Name"
										value={chess.getName('White')}
										onChange={this.nameChange('White')}
										margin="none"
										variant="outlined"
									/>
								</Grid>
								<Grid item={true} xs={'auto'}>
									<TextField
										id="outlined-name"
										label="Black Name"
										value={chess.getName('Black')}
										onChange={this.nameChange('Black')}
										margin="none"
										variant="outlined"
									/>
								</Grid>
								<Grid item={true} xs={'auto'}>
									<Button
										variant="outlined"
										style={{ height: '100%' }}
										onClick={() => this.newGame()}
									>
										New Game
									</Button>
								</Grid>
							</Grid>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel expanded={expand.game === 'fen'} onChange={this.expandChange('fen')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>Game FEN</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Grid container={true} spacing={8}>
								<Grid item={true} xs={9}>
									<TextField
										label="Forsyth–Edwards Notation (FEN)"
										key={`fen${update}`}
										defaultValue={chess.instance.fen()}
										InputProps={{
											readOnly: true
										}}
										variant="outlined"
										style={{ width: '100%' }}
									/>
								</Grid>
								<Grid item={true} xs={3}>
									<Button
										variant="outlined"
										style={{ height: '100%', float: 'right' }}
										onClick={() => {
											const { update } = this.state;
											this.setState({
												update: update + 1,
												dialog: {
													open: true,
													title: 'Change FEN',
													message: 'Enter a valid Forsyth–Edwards Notation (FEN)',
													agree: 'Set FEN',
													disagree: 'Cancel',
													input: '',
													action: (input?: string) => {
														if (input === undefined) return false;
														const valid = chess.instance.validate_fen(input).valid;
														if (valid) chess.newGame(input);
														return valid;
													},
													onClose: (value: boolean, state: IDialogOptions) => {
														if (value) this.closeDialogAndUpdate(state);
													}
												}
											});
										}}
									>
										Change
									</Button>
								</Grid>
							</Grid>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Grid >
			</Grid >
		);
	}
}
