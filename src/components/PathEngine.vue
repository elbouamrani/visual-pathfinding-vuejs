<template>
    <div class="path-engine-container">
        <h2>engine</h2>
        <div class="action-bar-container">
            <button @click="resetGrid">reset grid</button>
            &nbsp;|&nbsp;
            <button @click="generateMaze">generate maze</button>
            &nbsp;|&nbsp;
            <button @click="findPath">Find Path</button>
            &nbsp;|&nbsp;
            <select :value="clickMode" @change="setClickMode">
                <option v-for="(mode, key) in nodeTypes" :key="key">
                    {{ mode.type }}
                </option>
            </select>
        </div>
        <hr />
        <Grid :grid="grid" @cell-click="handleCellClick" />
    </div>
</template>

<script>
import {
    GridGenerator,
    // eslint-disable-next-line no-unused-vars
    mazeGenerator,
    // recursiveDivision,
} from "./../services/GraphService";
import AlgorithmService from "./../services/AlgorithmService";
import { recursiveDivision } from "./../utilities/algorithms/recursiveDivision";
import Grid from "./Grid";

const NODE_TYPES = [
    { type: "startNode", color: "green" },
    { type: "wall", color: "black" },
    { type: "targetNode", color: "rad" },
    { type: "empty", color: "white" },
];

// const censor = (key, value) => {
//     return value === Infinity ? "Infinity" : value;
// };

// const uncensor = (key, value) => {
//     return value === "Infinity" ? Infinity : value;
// };

export default {
    name: "PathEngine",
    components: {
        Grid,
    },
    data() {
        return {
            grid: null,
            startNodeCoords: null,
            targetNodeCoords: null,
            clickMode: "startNode",
            nodeTypes: NODE_TYPES,
        };
    },
    methods: {
        handleCellClick([x, y]) {
            // const grid = JSON.parse(
            //     JSON.stringify(this.grid, censor),
            //     uncensor
            // );
            const grid = this.grid;

            grid[x][y].type = this.clickMode;
            this.grid = grid;

            if (this.clickMode == "startNode") {
                this.startNodeCoords = [x, y];
            }
            if (this.clickMode == "targetNode") {
                this.targetNodeCoords = [x, y];
            }
        },
        setClickMode(event) {
            this.clickMode = event.target.value;
        },
        async findPath() {
            if (!this.startNodeCoords || !this.targetNodeCoords) {
                console.log("set start and target");
                return;
            }

            const startNode = this.grid[this.startNodeCoords[0]][
                this.startNodeCoords[1]
            ];
            const targetNode = this.grid[this.targetNodeCoords[0]][
                this.targetNodeCoords[1]
            ];

            await AlgorithmService.dijkstra.algorithm(
                this.grid,
                startNode,
                targetNode,
                true
            );

            await AlgorithmService.dijkstra.getTrack(targetNode, true);
        },
        generateMaze() {
            recursiveDivision(this.grid);
            setTimeout(() => {
                this.$forceUpdate();
            }, 10);
        },
        resetGrid() {
            this.startNodeCoords = null;
            this.targetNodeCoords = null;
            for (const col of this.grid) {
                for (const item of col) {
                    item.distance = Infinity;
                    item.isVisited = false;
                    item.isTrack = false;
                    item.type = "empty";
                    // this.$set(item, "distance", Infinity);
                }
            }
        },
    },
    mounted() {
        const defaultNode = NODE_TYPES.find((node) => node.type == "empty");

        this.grid = GridGenerator({
            width: 41,
            height: 41,
            defaultValue: {
                ...defaultNode,
                distance: Infinity,
                isVisited: false,
                isTrack: false,
            },
        });
    },
};
</script>
<style>
.path-engine-container {
    --cell-size: 6pt;
    --cell-border-color: gray;
    --cell-bg-color: black;
    --cell-border-size: 0.1pt;
}
</style>