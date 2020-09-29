<template>
  <div class="welcome outside">
    <div class="welcome__wrapper">
      <h1 class="title">Worky</h1>
      <div class="welcome__intro">
        <strong>Welcome visitor!</strong>
        It’s time of the adventure... <br>
        Create <b>your room</b>
        & invite <b>your friends</b>
      </div>
      <router-link class="c-button c-button--pink" to="/selection">Start Now!</router-link>
    </div>
  </div>
</template>

<script>
    import Vue from "vue";
    import TransitionMixin from "../../mixins/TransitionMixin";

    export default Vue.extend({
      mixins: [TransitionMixin],
    });
</script>