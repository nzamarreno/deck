<template>
  <div class="game">
    <canvas id="board"></canvas>
  </div>
</template>

<script>
import Vue from "vue";
import {Board} from "../../core/utilities/board.js";

export default Vue.extend({
    mounted() {
        new Board("#board", "#9c992e", "#5e1609");
    }
});
</script>