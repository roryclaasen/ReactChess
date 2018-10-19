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
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
}

class PieceComponent extends Component {
	// TODO Still picks up the background with this, need to fix
	// componentDidMount() {
	// 	const { connectDragPreview } = this.props;
	// 	connectDragPreview(this.pieceDOM());
	// }

	pieceDOM = () => {
		const { piece, isDragging } = this.props;
		const className = `piece ${piece.itemType}`;
		return (
			<div
				className={className}
				style={{
					opacity: isDragging ? 0.5 : 1
				}}
			>
				{piece.pieceType}
			</div>
		);
	};

	render() {
		const { connectDragSource } = this.props;
		return connectDragSource(this.pieceDOM());
	}
}

PieceComponent.propTypes = {
	// x: PropTypes.number.isRequired,
	// y: PropTypes.number.isRequired,
	piece: PropTypes.instanceOf(Piece).isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	// connectDragPreview: PropTypes.func.isRequired
};

export default DragSource('piece', pieceSource, collect)(PieceComponent);
