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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import BoardComponent from './board';
import ChessGame from '../../game';

interface IDisplayProps {
	chess: ChessGame;
}

interface IDisplayState {
	update: number;
	expand: {
		[key: string]: string | undefined;
		game: string | undefined;
	};
	dialog: {
		open: boolean;
		input: string;
		error: boolean;
	};
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
				input: '',
				error: false
			}
		};

		this.update = this.update.bind(this);
		// this.fenChange = this.fenChange.bind(this);
	}

	public update = () => {
		const { update } = this.state;
		this.setState({
			update: update + 1
		});
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

	private newGame = () => {
		const { chess } = this.props;
		chess.newGame();
		this.update();
	}

	private dialogOpen = () => this.setState({
		dialog: {
			open: true,
			input: '',
			error: false
		}
	})

	private dialogClose = () => {
		const { update } = this.state;
		const { input } = this.state.dialog;
		if (input && input.length > 0) {
			const { chess } = this.props;
			const valid = chess.instance.validate_fen(input);
			if (valid.valid) {
				chess.newGame(input);
				this.setState({
					dialog: {
						open: false,
						input: '',
						error: false
					},
					update: update + 1
				});
			} else {
				this.setState({
					dialog: {
						input,
						open: true,
						error: true
					}
				});
				return;
			}
		} else {
			this.setState({
				dialog: {
					open: false,
					input: '',
					error: false
				}
			});
		}
	}

	private fenChange = (event: any) => this.setState({
		dialog: {
			open: true,
			input: event.target.value,
			error: false
		}
	})

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
										onClick={this.newGame}
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
										onClick={this.dialogOpen}
									>
										Change
									</Button>
									<Dialog open={dialog.open} onClose={this.dialogClose} aria-labelledby="form-dialog-title">
										<DialogTitle id="form-dialog-title">Change FEN</DialogTitle>
										<DialogContent>
											<DialogContentText>
												Enter a valid Forsyth–Edwards Notation (FEN)
											</DialogContentText>
											<TextField
												error={dialog.error}
												autoFocus={true}
												variant="outlined"
												margin="dense"
												id="FEN"
												label="Forsyth–Edwards Notation (FEN)"
												type="text"
												fullWidth={true}
												value={dialog.input}
												onChange={this.fenChange}
											/>
										</DialogContent>
										<DialogActions>
											<Button onClick={this.dialogClose} color="primary">
												Cancel
											</Button>
											<Button onClick={this.dialogClose} color="primary">
												Set FEN
											</Button>
										</DialogActions>
									</Dialog>
								</Grid>
							</Grid>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Grid >
			</Grid >
		);
	}
}
