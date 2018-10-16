import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

import Piece from '../../shared/piece/piece';

const pieceSource = {
	beginDrag(props) {
		return {
			x: props.x,
			y: props.y,
			piece: props.piece
		};
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

class PieceComponent extends Component {
	render() {
		const { piece, connectDragSource, isDragging } = this.props;
		return connectDragSource(
			<span
				style={{
					opacity: isDragging ? 0.5 : 1,
					width: '100%',
					height: '100%',
					cursor: 'move'
				}}
			>
				{piece.name}
			</span>
		);
	}
}

PieceComponent.propTypes = {
	piece: PropTypes.instanceOf(Piece).isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired
};

export default DragSource('piece', pieceSource, collect)(PieceComponent);