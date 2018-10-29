import * as React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import Options from '../options.client';
import { ChangeCurrent } from '../pieces';

export interface OptionsModalProps {
	open: boolean;
	close: () => void;
	options: Options;
	updateOptions?: (options: Options) => void;
}

export default class OptionsModal extends React.Component<OptionsModalProps, {}> {
	private handleChangeCheckbox = (name: string) => (event: any) => {
		const { options, updateOptions } = this.props;
		options.changeOption(name, event.target.checked);
		updateOptions(options);
	}

	private handleChangeSelect = (name: string) => (event: any) => {
		const { options, updateOptions } = this.props;
		options.changeOption(name, event.target.value);
		updateOptions(options);
		if (name === 'Pieces') ChangeCurrent(options.Pieces());
	}

	private reset = () => {
		const { options, updateOptions } = this.props;
		options.reset();
		updateOptions(options);
	}

	public render() {
		const { open, close, options } = this.props;

		const pieceOptions: JSX.Element[] = [];
		options.PiecesList().forEach((piece) => {
			pieceOptions.push(
				<MenuItem value={piece} key={piece}>{piece}</MenuItem>
			);
		});

		const boardOptions: JSX.Element[] = [];
		options.BoardList().forEach((style) => {
			boardOptions.push(
				<MenuItem value={style} key={style}>{style}</MenuItem>
			);
		});

		const width100 = {
			width: '100%'
		};
		return (
			<Dialog
				aria-labelledby="Options"
				aria-describedby="User Interface Options"
				open={open}
				onClose={close}
			>
				<DialogTitle>Options</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Customise the user interface to your liking
					</DialogContentText>
					<Grid
						container={true}
						direction="column"
						spacing={16}
					>
						<Grid item={true}>
							<FormControlLabel
								control={(
									<Checkbox
										checked={options.ShowBackground()}
										onChange={this.handleChangeCheckbox('ShowBackground')}
										color="primary"
									/>
								)}
								label="Show Table Background"
								style={width100}
							/>
						</Grid>
						<Grid item={true}>
							<FormControl
								style={width100}
							>
								<InputLabel htmlFor="pieceStyle">Piece Style</InputLabel>
								<Select
									value={options.Pieces()}
									onChange={this.handleChangeSelect('Pieces')}
									inputProps={{
										name: 'PieceStyle',
										id: 'pieceStyle'
									}}
								>
									{pieceOptions}
								</Select>
							</FormControl>
						</Grid>
						<Grid item={true}>
							<FormControl
								style={width100}
							>
								<InputLabel htmlFor="pieceStyle">Board Style</InputLabel>
								<Select
									value={options.Board()}
									onChange={this.handleChangeSelect('Board')}
									inputProps={{
										name: 'BoardStyle',
										id: 'BoardStyle'
									}}
								>
									{boardOptions}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.reset} color="secondary" autoFocus={true}>
						Reset
					</Button>
					<Button onClick={close} color="primary" autoFocus={true}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
