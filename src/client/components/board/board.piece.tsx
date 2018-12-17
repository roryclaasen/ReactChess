import * as React from 'react';

import { ConnectDragPreview, ConnectDragSource, DragSourceSpec, DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';

import piece from '../../../game/piece/piece';

import PieceManager from '../../pieces/manager';

export interface IPieceProps {
	x: number;
	y: number;
	piece: piece;
	isTurn: boolean;
	isDragging?: boolean;
	connectDragSource?: ConnectDragSource;
	connectDragPreview?: ConnectDragPreview;
}

export interface IPieceState {
	image: HTMLImageElement;
}

const pieceSource = {
	beginDrag(props: IPieceProps) {
		return {
			x: props.x,
			y: props.y,
			piece: props.piece
		};
	},
	canDrag(props: IPieceProps) {
		return props.isTurn;
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
export default class PieceComponent extends React.Component<IPieceProps, IPieceState> {

	constructor(props: IPieceProps) {
		super(props);

		const { piece } = this.props;
		this.state = {
			image: PieceManager.getImageElement(piece.color, piece.type)
		};
	}

	public componentDidMount(): void {
		const { connectDragPreview } = this.props;
		const { image } = this.state;
		image.onload = () => connectDragPreview(image);
	}

	private pieceDOM(): JSX.Element {
		const { piece, isDragging } = this.props;
		const { image } = this.state;
		const className = `piece ${piece.type}`;

		return (
			<div
				className={className}
				style={{
					opacity: isDragging ? 0.25 : 1
				}}
			>
				{/* {piece.type} */}
				<img
					src={image.src}
					alt="gamePiece"
				/>
			</div>
		);
	}

	public render(): JSX.Element {
		const { connectDragSource } = this.props;
		return connectDragSource(this.pieceDOM());
	}
}
