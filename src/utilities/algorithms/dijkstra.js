const meta = {
	name: "dijkstra",
	weigthed: true,
};

//flatten the grid
const getAllNodes = (grid) => {
	const nodes = [];
	for (const row of grid) {
		for (const node of row) {
			nodes.push(node);
		}
	}
	return nodes;
};

const sortNodesByDistance = (unvisitedNodes) => {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node, grid) => {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = node.distance + 1;
		neighbor.previousNode = node;
	}
};

const getUnvisitedNeighbors = (node, grid) => {
	const neighbors = [];
	const { col, row } = node;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const sleep = (delay) => {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

const dijkstra = {
	meta,
	algorithm: async (grid, startNode, targetNode, animate = false) => {
		const visitedNodesInOrder = [];
		const unvisitedNodes = getAllNodes(grid);
		startNode.distance = 0;
		startNode.opacity = 0;
		while (unvisitedNodes.length) {
			sortNodesByDistance(unvisitedNodes);
			const closestNode = unvisitedNodes.shift();
			// If we encounter a wall, we skip it.
			if (closestNode.type === "wall") continue;
			// If the closest node is at a distance of infinity,
			// we must be trapped and should therefore stop.
			if (closestNode.distance === Infinity) return visitedNodesInOrder;
			closestNode.isVisited = true;
			visitedNodesInOrder.push(closestNode);
			if (closestNode === targetNode) return visitedNodesInOrder;
			updateUnvisitedNeighbors(closestNode, grid);

			if (animate) {
				await sleep(4);
			}
		}
	},
	getTrack: async (targetNode, animate = false) => {
		const nodesInShortestPathOrder = [];
		let currentNode = targetNode;
		while (currentNode) {
			nodesInShortestPathOrder.push(currentNode);
			currentNode.isTrack = true;
			currentNode = currentNode.previousNode;
			console.log(currentNode);

			if (animate) {
				await sleep(200);
			}
		}
		return nodesInShortestPathOrder;
	},
};

export default dijkstra;
