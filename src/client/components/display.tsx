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
}

export default class DisplayComponent extends React.Component<IDisplayProps, IDisplayState> {
	constructor(props: IDisplayProps) {
		super(props);

		this.state = {
			update: 0,
			expand: {
				game: undefined
			}
		};

		this.update = this.update.bind(this);
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

	private expandChange = (panel: string) => (event: any, isExpanded: boolean) => {
		this.setState({
			expand: {
				game: isExpanded ? panel : undefined
			}
		});
	}

	public render(): JSX.Element {
		const { chess } = this.props;
		const { update, expand } = this.state;
		const header = chess.instance.header();
		let turn = `It is ${chess.turn()}'s turn`;
		const turnInfo = [`You are ${chess.turnColor()}`] as string[];

		if (chess.instance.game_over()) {
			turn = 'Game over';
			if (chess.instance.in_check()) {
				turn += ', ';
				if (chess.turnColor() === 'White') turn += chess.opponent();
				else turn += chess.turn();
				turn += ' Wins!';
			} else turn += `, ${chess.turn()} wins`;
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
				style={{ width: '100%' }}
			>
				<Grid item={true} className="card-width">
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
				<Grid item={true} className="card-width">
					<ExpansionPanel expanded={expand.game === 'options'} onChange={this.expandChange('options')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>Game Options</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								id="outlined-name"
								label="White Name"
								value={chess.getName('White')}
								onChange={this.nameChange('White')}
								margin="none"
								variant="outlined"
								style={{ marginRight: '1em' }}
							/>
							<TextField
								id="outlined-name"
								label="Black Name"
								value={chess.getName('Black')}
								onChange={this.nameChange('Black')}
								margin="none"
								variant="outlined"
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel expanded={expand.game === 'fen'} onChange={this.expandChange('fen')}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>Game FEN</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography
								component="code"
								key={`fen${update}`}
								style={{ wordWrap: 'break-word' }}
							>
								{chess.instance.fen()}
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Grid >
			</Grid >
		);
	}
}
