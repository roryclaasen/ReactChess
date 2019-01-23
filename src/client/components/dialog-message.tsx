import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

export interface IDialogOptions {
	open: boolean;
	title: string;
	message: string;
	disagree?: string;
	agree: string;
	input?: string;
	inputError?: boolean;
	action?: (input?: string) => boolean;
	onClose?: (value: boolean, state: IDialogOptions) => void;
}

interface IDialogProps {
	all: IDialogOptions;
}

export default class DialogMessage extends React.Component<IDialogProps | IDialogOptions, IDialogOptions> {
	constructor(props: IDialogProps | IDialogOptions) {
		super(props);
		if ('all' in props) {
			this.state = props.all;
		} else {
			const { open, title, message, disagree, agree, input, inputError, action, onClose } = props;
			this.state = { open, title, message, disagree, agree, input, inputError, action, onClose };
		}
		this.handleDialogClose = this.handleDialogClose.bind(this);
	}

	private handleDialogClose = (agreed?: boolean) => {
		const { action, input, onClose } = this.state;
		let result = true;
		if (agreed === true && action !== undefined) result = action(input);
		if (result) {
			const newState = { ... this.state };
			newState.open = false;
			newState.action = undefined;
			this.setState(newState);
			if (onClose) onClose(agreed !== undefined ? agreed : false, newState);
		} else if (input) this.setState({ inputError: true });
		return result;
	}

	private inputChanged = (event: any) => {
		this.setState({
			input: event.target.value,
			inputError: false
		});
	}

	public render(): JSX.Element {
		const { open, title, message, input, inputError, disagree, agree, onClose } = this.state;
		return (
			<Dialog
				open={open}
				onClose={() => this.handleDialogClose(false)}
				keepMounted={true}
			>
				<DialogTitle>{title}</DialogTitle>
				{(message !== undefined || input !== undefined) && (
					<DialogContent>
						{message !== undefined && (
							<DialogContentText>
								{message}
							</DialogContentText>
						)}
						{input !== undefined && (
							<TextField
								error={inputError}
								autoFocus={true}
								variant="outlined"
								margin="dense"
								type="text"
								fullWidth={true}
								value={input}
								onChange={this.inputChanged}
							/>
						)}
					</DialogContent>
				)}
				<DialogActions>
					{disagree !== undefined && (
						<Button onClick={() => this.handleDialogClose(false)} color="secondary">
							{disagree}
						</Button>
					)}
					<Button onClick={() => this.handleDialogClose(true)} color="primary" autoFocus={input === undefined}>
						{agree}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
