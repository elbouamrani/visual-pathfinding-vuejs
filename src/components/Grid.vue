<template>
    <div>
        <div class="row" v-for="(row, index) in grid" :key="index">
            <Cell
                :data="item"
                v-for="(item, jndex) in row"
                :key="jndex"
                @cell-click="handleCellClick([index, jndex])"
            />
        </div>
    </div>
</template>

<script>
import Cell from "./Cell";

export default {
    name: "Grid",
    props: ["grid"],
    components: {
        Cell,
    },
    methods: {
        handleCellClick(coords) {
            this.$emit("cell-click", coords);
        },
    },
};
</script>

<style>
.row {
    display: flex;
}
</style>