import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default class OptionsModal extends Component {
	handleChangeCheckbox = (name) => (event) => {
		const { options, updateOptions } = this.props;
		options.changeOption(name, event.target.checked);
		updateOptions(options);
	}

	handleChangeSelect = (name) => (event) => {
		const { options, updateOptions } = this.props;
		options.changeOption(name, event.target.value);
		updateOptions(options);
		if (name === 'Pieces') ChangeCurrent(options.Pieces());
	}

	reset = () => {
		const { options, updateOptions } = this.props;
		options.reset();
		updateOptions(options);
	}

	render() {
		const { open, close, options } = this.props;

		const PieceOptions = [];
		options.PiecesList().forEach((piece) => {
			PieceOptions.push(
				<MenuItem value={piece} key={piece}>{piece}</MenuItem>
			);
		});

		const BoardOptions = [];
		options.BoardList().forEach((style) => {
			BoardOptions.push(
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
						container
						direction="column"
						spacing={16}
					>
						<Grid item>
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
						<Grid item>
							<FormControl
								style={width100}
							>
								<InputLabel htmlFor="pieceStyle">Piece Style</InputLabel>
								<Select
									value={options.Pieces()}
									onChange={this.handleChangeSelect('Pieces')}
									inputProps={{
										name: 'PieceStyle',
										id: 'pieceStyle',
									}}
								>
									{PieceOptions}
								</Select>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl
								style={width100}
							>
								<InputLabel htmlFor="pieceStyle">Board Style</InputLabel>
								<Select
									value={options.Board()}
									onChange={this.handleChangeSelect('Board')}
									inputProps={{
										name: 'BoardStyle',
										id: 'BoardStyle',
									}}
								>
									{BoardOptions}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.reset} color="secondary" autoFocus>
						Reset
					</Button>
					<Button onClick={close} color="primary" autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

OptionsModal.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	options: PropTypes.instanceOf(Options).isRequired,
	updateOptions: PropTypes.func
};

OptionsModal.defaultProps = {
	updateOptions: undefined
};
