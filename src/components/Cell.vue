<template>
    <div
        class="cell"
        @mouseover="handleCellClick"
        @mousedown="handleCellClick"
        :style="style()"
    >
        <!-- <span v-if="data.isTrack" style="color: orange"></span> -->
    </div>
</template>

<script>
// const DEFAULT_BG_COLOR = "lightgray";

const NODE_TYPES = [
    { type: "startNode", color: "green" },
    { type: "wall", color: "black" },
    { type: "targetNode", color: "red" },
    { type: "empty", color: "white" },
];

export default {
    name: "Cell",
    props: ["data"],
    methods: {
        handleCellClick(event) {
            if (event.buttons === 1) {
                this.$emit("cell-click");
            }
        },
        getBackground() {
            if (this.data.isTrack) {
                return "orange";
            }
            if (this.data.isVisited) {
                return "blue";
            }

            const nodeType = NODE_TYPES.find((node) => {
                return node.type === this.data.type;
            });
            const defaultNode = NODE_TYPES.find((node) => node.type == "empty");

            return nodeType?.color || defaultNode.color;
        },
        getOpacity() {
            return this.data.isVisited ? this.data.distance / 140 + 0.4 : 1;
        },
        getBorderColor() {
            // return this.data.isVisited ? "purple" : "gray";
            return "black";
        },
        style() {
            return {
                background: this.getBackground(),
                borderColor: this.getBorderColor(),
                opacity: this.getOpacity(),
            };
        },
    },
};
</script>

<style>
.cell {
    width: var(--cell-size);
    height: var(--cell-size);
    border: var(--cell-border-size) solid var(--cell-border-color);
    background-color: var(--cell-border-color);
    box-sizing: border-box;
}
</style>