import * as React from 'react';

import { DropTarget, DropTargetCollector, DropTargetSpec, ConnectDropTarget, DropTargetMonitor } from 'react-dnd';

export interface SquareProps {
	connectDropTarget?: ConnectDropTarget;
	isOver?: boolean;
	canDrop?: boolean;
	canMove: (x1: number, y1: number, x2: number, y2: number) => boolean;
	move: (x1: number, y1: number, x2: number, y2: number) => void;
	x: number;
	y: number;
}

const squareTarget: DropTargetSpec<SquareProps> = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return props.canMove(item.x, item.y, props.x, props.y);
	},
	drop(props, monitor) {
		const item = monitor.getItem();
		props.move(item.x, item.y, props.x, props.y);
	}
};

const collect: DropTargetCollector<any> = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
};

@DropTarget('piece', squareTarget, collect)
export default class SquareComponent extends React.Component<SquareProps, {}> {
	renderOverlay = (type: string) => {
		const className = `available ${type}`;
		return <div className={className} />;
	}

	render() {
		const { connectDropTarget, isOver, canDrop, children } = this.props;

		return connectDropTarget(
			<div className="square">
				{children}
				{isOver && !canDrop && this.renderOverlay('unplaceable')}
				{!isOver && canDrop && this.renderOverlay('placeable')}
				{isOver && canDrop && this.renderOverlay('place')}
			</div>
		);
	}
}
