import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

import Piece from '../../../shared/piece/piece';

import { makeImage as PieceImage, getUrl as GetPieceUrl } from '../../pieces';

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
	componentDidMount() {
		const { connectDragPreview, piece } = this.props;
		const image = PieceImage(piece.color, piece.type, 0.5);
		image.onload = () => connectDragPreview(image);
	}

	pieceDOM = () => {
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
	connectDragPreview: PropTypes.func.isRequired
};

export default DragSource('piece', pieceSource, collect)(PieceComponent);
