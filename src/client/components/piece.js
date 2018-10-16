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
			<div
				className="piece"
				style={{
					opacity: isDragging ? 0.5 : 1
				}}
			>
				{piece.name}
			</div>
		);
	}
}

PieceComponent.propTypes = {
	// x: PropTypes.number.isRequired,
	// y: PropTypes.number.isRequired,
	piece: PropTypes.instanceOf(Piece).isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired
};

export default DragSource('piece', pieceSource, collect)(PieceComponent);
