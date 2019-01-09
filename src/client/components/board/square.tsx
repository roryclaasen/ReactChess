import React from 'react';

import { Move } from 'chess.js';
import { DropTarget, DropTargetSpec, DropTargetCollector, ConnectDropTarget } from 'react-dnd';

import ChessGame from '../../../game';
import { IPieceData } from './piece';

interface ISquareProps {
	chess: ChessGame;
	x: number;
	y: number;
	children: any;
	move: (x1: number, y1: number, x2: number, y2: number) => Move | null;

	flip?: boolean;
	connectDropTarget?: ConnectDropTarget;
	isOver?: boolean;
	canDrop?: boolean;
}

const squareTarget: DropTargetSpec<ISquareProps> = {
	drop(props, monitor) {
		const item = monitor.getItem() as IPieceData;
		props.move(item.x, item.y, props.x, props.y);
	},
	canDrop(props, monitor) {
		const { chess } = props;
		const item = monitor.getItem() as IPieceData;

		const to = chess.actualSquare(props.x, props.y);
		const from = chess.actualSquare(item.x, item.y);

		const moves = chess.game.moves({ verbose: true, square: from });
		let canDrop = false;
		for (const move of moves) {
			if (move.to === to) {
				canDrop = true;
				break;
			}
		}
		return canDrop;
	}
};

const collect: DropTargetCollector<any> = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
};

class SquareComponent extends React.Component<ISquareProps, {}> {
	private renderOverlay(overlay: string): JSX.Element {
		const classes = ['overlay'];
		classes.push(overlay);
		return <div className={classes.join(' ')} />;
	}

	renderNotes(): JSX.Element | undefined {
		const { chess, x, y, flip } = this.props;
		const letterY = flip ? 7 : 0;
		if (x !== 0 && y === letterY) return <span className="note">{chess.actual(x, y).x}</span>;
		if (x === 0 && y !== letterY) return <span className="note">{chess.actual(x, y).y}</span>;
		if (x === 0 && y === letterY) return <span className="note">{chess.actual(x, y).x}{chess.actual(x, y).y}</span>;
	}

	public render(): JSX.Element {
		const { chess, x, y, children, connectDropTarget, isOver, canDrop } = this.props;
		if (!connectDropTarget) return <React.Fragment />;
		return connectDropTarget(
			<td className={['color', chess.color(x, y)].join(' ')}>
				{this.renderNotes()}
				{children}
				{isOver && !canDrop && this.renderOverlay('deny')}
				{!isOver && canDrop && this.renderOverlay('available')}
				{isOver && canDrop && this.renderOverlay('valid')}
			</td>
		);
	}
}

export default DropTarget('piece', squareTarget, collect)(SquareComponent);
