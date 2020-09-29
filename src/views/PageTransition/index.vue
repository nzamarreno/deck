<template>
    <div class="page-transition" :class="{ '--is-active': onTransition, '--leave': !onTransition, '--entrance': onTransition }"
    >
        <h2 class="page-transition__loader" v-html="splitText"></h2>
    </div>
</template>

<script>
    import Vue from "vue";

    export default Vue.extend({
        name: "page-transition",

        data() {
            return {
                onTransition: true,
                splitText: null,
            }
        },

        mounted() {
            this.setSplitText();
            this.bind();
        },

        methods: {
            bind() {
                this.$Emitter.on("beginTransition", this.addTransition);
                this.$Emitter.on("afterTransition", this.removeTransition);
            },

            setSplitText() {
                const TITLE = "DECKYFY";
                let titleSplitted = "";
                for (let index = 0; index < TITLE.length; index++) {
                    titleSplitted += `<span class="page-transition__letter">${TITLE[index]}</span>`;
                }

                this.splitText = titleSplitted;
            },

            addTransition() {
                this.onTransition = true;

                setTimeout(() => {
                    this.$Emitter.emit("endTransition");
                }, 1000);
            },

            removeTransition() {
                setTimeout(() => {
                    this.onTransition = false;
                }, 2000);
            }
        }
    });
</script>