import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

const squareTarget = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return props.canMove(item.x, item.y, props.x, props.y);
	},
	drop(props, monitor) {
		const item = monitor.getItem();
		props.move(item.x, item.y, props.x, props.y);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
}

class SquareComponent extends Component {
	renderOverlay = (type) => {
		const className = `available ${type}`;
		return <div className={className} />;
	}

	render() {
		const { connectDropTarget, isOver, canDrop, children } = this.props;

		return connectDropTarget(
			<div className="square">
				{children}
				{isOver && !canDrop && this.renderOverlay('red')}
				{!isOver && canDrop && this.renderOverlay('yellow')}
				{isOver && canDrop && this.renderOverlay('green')}
			</div>
		);
	}
}

SquareComponent.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	isOver: PropTypes.bool.isRequired,
	canDrop: PropTypes.bool.isRequired,
	children: PropTypes.any.isRequired
};

export default DropTarget('piece', squareTarget, collect)(SquareComponent);
