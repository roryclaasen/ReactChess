import { PieceColors } from './constants';

export function Bishop(x, y, toX, toY, grid) {
	const dx = toX - x;
	const dy = toY - y;
	const path = (Math.abs(dx) === Math.abs(dy));
	if (grid === undefined || !path) return path;

	let clear = true;
	const length = Math.abs(dx);
	const ox = dx > 0 ? 1 : -1;
	const oy = dy > 0 ? 1 : -1;
	for (let i = 1; i < length; i += 1) {
		const tx = x + (i * ox);
		const ty = y + (i * oy);
		if (grid[tx][ty] !== undefined) clear = false;
	}
	return clear;
}

export function King(x, y, toX, toY) {
	const dx = toX - x;
	const dy = toY - y;

	return !(Math.abs(dx) > 1 || Math.abs(dy) > 1);
}

export function Knight(x, y, toX, toY) {
	const dx = toX - x;
	const dy = toY - y;

	return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}

export function Pawn(x, y, toX, toY, grid, color) {
	const dx = toX - x;
	const dy = toY - y;

	if (color === PieceColors.WHITE && dy < 0) return false;
	if (color === PieceColors.BLACK && dy > 0) return false;

	const moveTwo = y === 1 || y === 6;

	// TODO En Passant
	// TODO Promotion

	const path = (Math.abs(dy) === 1 || (moveTwo && Math.abs(dy) === 2)) && Math.abs(dx) === 0;
	if (grid === undefined) return path;
	if (path) {
		if (Math.abs(dy) === 2) {
			if (grid[toX][toY + (dy < 0 ? 1 : -1)] !== undefined) return false;
		}
		return grid[toX][toY] === undefined;
	}
	if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
		return grid[toX][toY] !== undefined;
	}
	return false;
}

export function Rook(x, y, toX, toY, grid) {
	const path = !(x !== toX && y !== toY);
	if (grid === undefined || !path) return path;
	const dx = toX - x;
	const dy = toY - y;

	let clear = true;
	const length = Math.max(Math.abs(dx), Math.abs(dy));
	let ox = 0;
	if (dx !== 0) ox = dx > 0 ? 1 : -1;
	let oy = 0;
	if (dy !== 0) oy = dy > 0 ? 1 : -1;
	for (let i = 1; i < length; i += 1) {
		const tx = x + (i * ox);
		const ty = y + (i * oy);
		if (grid[tx][ty] !== undefined) {
			clear = false;
		}
	}
	return clear;
}

export function Queen(x, y, toX, toY, grid) {
	return Rook(x, y, toX, toY, grid) || Bishop(x, y, toX, toY, grid);
}

export default {
	Bishop,
	King,
	Knight,
	Pawn,
	Rook,
	Queen
};
