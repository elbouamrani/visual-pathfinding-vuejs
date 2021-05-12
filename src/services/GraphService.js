/* eslint-disable no-unused-vars */
export const GridGenerator = ({
	width,
	height = null,
	defaultValue = {},
} = {}) => {
	const grid = [];

	height = height || width;

	for (let index = 0; index < height; index++) {
		const row = [];

		for (let jndex = 0; jndex < width; jndex++) {
			row.push({ ...defaultValue, row: index, col: jndex });
		}

		grid.push(row);
	}

	return grid;
};

export const mazeGenerator = async (grid, type) => {
	for (const col of grid) {
		for (const item of col) {
			if (Math.random() > 0.8) {
				item.type = type;
			}
			// await sleep(4);
		}
	}
};

export const recursiveDivision = async (grid, type, max = 0) => {
	console.log("call number : " + max);

	if (max > 10) return;
	if (!grid || !grid.length) return;
	if (grid.length <= 4 && grid[0].length <= 4) return true;
	console.log(grid.length, grid[0].length);

	let line = [];
	let position = null;

	const orientation = Math.random() > 0.5 ? "vertical" : "horizontal";
	// const orientation = "vertical";

	if (orientation === "horizontal") {
		position = Math.round(Math.random() * grid.length);

		const group1 = grid.slice(0, position - 1);
		const group2 = grid.slice(position + 1, grid.length);

		line = grid[position];

		recursiveDivision(group1, type, ++max);
		recursiveDivision(group2, type, ++max);
	} else {
		position = Math.round(Math.random() * grid[0].length);

		const group1 = [];
		const group2 = [];

		for (let index = 0; index < grid.length; index++) {
			const row = grid[index];

			line.push(row[position]);

			group1.push(grid.slice(0, position - 1));
			group2.push(grid.slice(position + 1, grid.length));
		}
		// console.log(group1.length, group1[0].length);
		recursiveDivision(group1, type, ++max);
		recursiveDivision(group2, type, ++max);
	}

	if (line && line.length) {
		for (const item of line) {
			item.type = type;
		}
	}

	const gate = line[Math.floor(Math.random() * line.length)];

	if (gate) {
		gate.type = "empty";
	}

	console.log(position, line.length);
};

const sleep = (delay) => {
	if (Math.random() > 0.8) {
		return new Promise((resolve) => setTimeout(resolve, delay));
	}
	return;
};
