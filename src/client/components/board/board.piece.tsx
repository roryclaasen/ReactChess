import * as React from 'react';

import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';

import piece from '../../../shared/piece/piece';

import { makeImage as PieceImage, getUrl as GetPieceUrl } from '../../pieces';

export interface PieceProps {
	x: number;
	y: number;
	piece: piece;
	isDragging?: boolean;
	connectDragSource?: ConnectDragSource;
	connectDragPreview?: ConnectDragPreview;
}

const pieceSource = {
	beginDrag(props: PieceProps) {
		return {
			x: props.x,
			y: props.y,
			piece: props.piece
		};
	}
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
}

@DragSource('piece', pieceSource, collect)
export default class PieceComponent extends React.Component<PieceProps, {}> {
	public componentDidMount() {
		const { connectDragPreview, piece } = this.props;
		const image = PieceImage(piece.color, piece.type);
		image.onload = () => connectDragPreview(image);
	}

	private pieceDOM = () => {
		const { piece, isDragging } = this.props;
		const className = `piece ${piece.type}`;

		return (
			<div
				className={className}
				style={{
					opacity: isDragging ? 0.25 : 1
				}}
			>
				<img
					src={GetPieceUrl(piece.color, piece.type)}
					alt="gamePiece"
				/>
			</div>
		);
	}

	public render() {
		const { connectDragSource } = this.props;
		return connectDragSource(this.pieceDOM());
	}
}
