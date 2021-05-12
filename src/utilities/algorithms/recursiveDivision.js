/* eslint-disable no-unreachable */
export const recursiveDivision = async (grid) => {
	addOuterWalls(grid);
	const ent = addEntrance(grid);
	await addInnerWalls(
		grid,
		true,
		1,
		grid.length - 2,
		1,
		grid[0].length - 2,
		ent
	);
};

const addOuterWalls = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		if (i == 0 || i == grid.length - 1) {
			for (let j = 0; j < grid[0].length; j++) {
				grid[i][j].type = "wall";
			}
		} else {
			grid[i][0].type = "wall";
			grid[i][grid[0].length - 1].type = "wall";
		}
	}
};

const addEntrance = (grid) => {
	const position = randomNumber(1, grid.length - 1);
	grid[grid.length - 1][position].type = "wall";
	return position;
};

const addInnerWalls = async (
	grid,
	orientation,
	minX,
	maxX,
	minY,
	maxY,
	gate
) => {
	if (orientation) {
		if (maxX - minX < 2) {
			return;
		}

		const y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
		console.log(minY, maxY);
		await addHorizontalWall(grid, minX, maxX, y);

		addInnerWalls(grid, !orientation, minX, maxX, minY, y - 1, gate);
		addInnerWalls(grid, !orientation, minX, maxX, y + 1, maxY, gate);
	} else {
		if (maxY - minY < 2) {
			return;
		}

		const x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
		await addVerticalWall(grid, minY, maxY, x);

		addInnerWalls(grid, !orientation, minX, x - 1, minY, maxY, gate);
		addInnerWalls(grid, !orientation, x + 1, maxX, minY, maxY, gate);
	}
};

const addHorizontalWall = async (grid, minX, maxX, y) => {
	const hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

	for (let i = minX; i <= maxX; i++) {
		console.log([y, i]);
		await sleep(4);
		if (i == hole) grid[y][i].type = "empty";
		else grid[y][i].type = "wall";
	}
};

const addVerticalWall = async (grid, minY, maxY, x) => {
	const hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

	for (let i = minY; i <= maxY; i++) {
		await sleep(4);
		if (i == hole) grid[i][x].type = "empty";
		else grid[i][x].type = "wall";
	}
};

const randomNumber = (min, max) => {
	// console.log("generate random");
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const sleep = (delay) => {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

// function display() {
//     document.getElementById("cnt").innerHTML.type = "empty";

//     for (var i = 0; i < grid.length; i++) {
//         var output = "<div>";
//         for (var j = 0; j < grid.length; j++) {
//             output += "<b " + grid[i][j] + "></b>";
//         }
//         output += "</div>";
//         document.getElementById("cnt").innerHTML += output;
//     }
// }
// generate(31, 1, 1);
// display();
