import * as React from 'react';

import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';

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
	imageJSX: JSX.Element;
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
			image: PieceManager.getImageElement(piece.color, piece.type),
			imageJSX: PieceManager.getImageJSX(piece.color, piece.type)
		};
	}

	public componentDidMount(): void {
		const { connectDragPreview } = this.props;
		const { image } = this.state;
		image.onload = () => connectDragPreview(image);
	}

	public render(): JSX.Element {
		const { piece, isDragging } = this.props;
		const { imageJSX } = this.state;
		const className = `piece ${piece.type}`;
		const { connectDragSource } = this.props;
		return connectDragSource(
			<div
				className={className}
				style={{
					opacity: isDragging ? 0.25 : 1
				}}
			>
				{/* {piece.type} */}
				{imageJSX}
			</div>
		);
	}
}
