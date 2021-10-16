import Brick from './brick';
export const buildLevel = (game, level) => {
	let bricks = [];
	level.map((row, rowIndex) =>
		row.map((brick, brickIndex) => {
			if (brick === 1) {
				let position = { x: brickIndex * 80 + 2, y: 50 + 24 * rowIndex };
				bricks.push(new Brick(game, position));
			}
		})
	);
	return bricks;
};

export const level1 = [
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, , 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
export const level2 = [
	[0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
