import React from 'react';

import { Piece } from 'chess.js';
import { DragSource, DragSourceConnector, DragSourceMonitor, ConnectDragSource, ConnectDragPreview } from 'react-dnd';

import ChessGame from '../../../game';

interface IPieceProps {
	chess?: ChessGame;
	x: number;
	y: number;
	piece: Piece;

	isDragging?: boolean;
	connectDragSource?: ConnectDragSource;
	connectDragPreview?: ConnectDragPreview;
}

const dragSource = {
	beginDrag(props: IPieceProps) {
		return {
			piece: props.piece,
			x: props.x,
			y: props.y
		};
	}
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

class PieceComponent extends React.Component<IPieceProps, {}> {
	public render(): JSX.Element {
		const { piece, connectDragSource, isDragging } = this.props;
		if (!connectDragSource) return <React.Fragment />;

		const classNames = ['piece'];
		if (isDragging) classNames.push('dragging');

		return connectDragSource(
			<span className={classNames.join(' ')}>{piece.type}, {piece.color}</span>
		);
	}
}

export default DragSource('piece', dragSource, collect)(PieceComponent);
