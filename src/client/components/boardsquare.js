import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

const squareTarget = {
	drop(props, monitor) {
		const item = monitor.getItem();
		props.move(item.x, item.y, props.x, props.y);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

class SquareComponent extends Component {
	render() {
		const { connectDropTarget, isOver, children } = this.props;

		return connectDropTarget(
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '100%'
				}}
			>
				{children}
				{isOver && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							height: '100%',
							width: '100%',
							zIndex: 1,
							opacity: 0.5,
							backgroundColor: 'yellow',
						}}
					/>
				)}
			</div>
		);
	}
}

SquareComponent.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	isOver: PropTypes.bool.isRequired,
	children: PropTypes.any.isRequired
};

export default DropTarget('piece', squareTarget, collect)(SquareComponent);
