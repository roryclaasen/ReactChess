import React from 'react';

import { Move, ChessInstance } from 'chess.js';
import { DropTarget, DropTargetSpec, DropTargetCollector, ConnectDropTarget } from 'react-dnd';

import ChessGame from '../../../game';

interface ISquareProps {
	chess: ChessGame;
	x: number;
	y: number;
	children: any;
	move: (x1: number, y1: number, x2: number, y2: number) => Move | null;

	connectDropTarget?: ConnectDropTarget;
	isOver?: boolean;
	canDrop?: boolean;
}

const squareTarget: DropTargetSpec<ISquareProps> = {
	drop(props, monitor) {
		const item = monitor.getItem();
		props.move(item.x, item.y, props.x, props.y);
	},
	canDrop(props, monitor) {
		// TODO: If I can... tidy this up

		const item = monitor.getItem();
		const to = props.chess.actualSquare(props.x, props.y);
		const from = props.chess.actualSquare(item.x, item.y);
		const moves = props.chess.game.moves({ square: from });
		let canDrop = false;
		for (const move of moves) {
			if (move.length === 2) {
				if (move === to as string) {
					canDrop = true;
					break;
				}
			}
			if (move.endsWith(to as string)) {
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
	private renderOverlay(color: string): JSX.Element {
		return (
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
					zIndex: 1,
					opacity: 0.5,
					backgroundColor: color
				}}
			/>
		);
	}

	public render(): JSX.Element {
		const { chess, x, y, children, connectDropTarget, isOver, canDrop } = this.props;
		if (!connectDropTarget) return <React.Fragment />;
		return connectDropTarget(
			<td className={['color', chess.color(x, y)].join(' ')}>
				{y === 0 &&
					<span className="note x">{chess.actual(x, y).x}</span>
				}
				{x === 0 &&
					<span className="note y">{chess.actual(x, y).y}</span>
				}
				{children}
				{isOver && !canDrop && this.renderOverlay('red')}
				{!isOver && canDrop && this.renderOverlay('yellow')}
				{isOver && canDrop && this.renderOverlay('green')}
			</td>

		);
	}
}

export default DropTarget('piece', squareTarget, collect)(SquareComponent);