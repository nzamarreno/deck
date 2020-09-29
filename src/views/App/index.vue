<template>
    <div id="app__wrapper">
        <page-transition></page-transition>
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from "vue";
    import PageTransition from "../PageTransition";

    export default Vue.extend({
        name: "app",

        components: {
            PageTransition
        }
    });
</script>