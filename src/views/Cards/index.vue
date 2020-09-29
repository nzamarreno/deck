<template>
  <div class="cards">
    <div class="card-game__card">
          <div class="card-game__wrapper" style="background-color:#ED902C;">
            {{color}}
          </div>
      </div>
      <input v-model="group"/>
      <button @click="send">Send</button>
      <ul class="card-game">
          <li v-for="(item, index) in colors" :key="index" class="card-game__card" style="transform:translateX(0rem);z-index:1;">
              <div class="card-game__wrapper" @click="onClick(item)" :style="{backgroundColor: item}">
                {{item}}
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import Vue from "vue";
import {SOCKETEVENT} from "./../../core/helpers/socket-event"

export default Vue.extend({
  data() {
    return {
      color: null,
      group: "",
      colors: ["#ED902C", "#666666", "#45BDA2", "#EC576A"]
    }
  },

  mounted() {
    this.$VueSocket.onMessage((message) => this.actualize(message))
  },

  methods: {
    actualize(message) {
      this.color = message.data.color;
    },

    send() {
      this.$VueSocket.sendMessage({ 
        type: SOCKETEVENT.CREATE,
        groupId: this.group
      });
    },

    onClick(color) {
      this.$VueSocket.sendMessage({ 
        type: SOCKETEVENT.JOIN,
        color: color
      });
    }
  }
});
</script>