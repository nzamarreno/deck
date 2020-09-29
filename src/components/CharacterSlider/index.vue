<template>
  <ul class="character-slider">
    <li class="character-slider__item" v-for="(character, index) in characters" :key="index" @click="handleOnClick(index)">
      <img class="character-slider__picture" :src="character.image" alt />
      <svg
        width="140"
        height="136"
        viewBox="0 0 140 136"
        fill="none"
        class="character-slider__bg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M129.251 72.4286C122.274 101.464 78.1147 126.443 49.0795 119.466C20.0444 112.489 8.63631 74.1567 15.6134 45.1216C22.5905 16.0864 45.7965 5.32117 74.8317 12.2983C103.867 19.2753 136.229 43.3934 129.251 72.4286Z"
          :fill="character.color"
        />
      </svg>
    </li>
  </ul>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
    props: {
        onClick: {
            type: Function,
            required: false
        },
        characters: {
            type: Array,
            required: true
        }
    },

    methods: {
        handleOnClick(indexSlider) {
            if (this.onClick) this.onClick(indexSlider);
        }
    }
});
</script>