<script>
    export default {
        beforeRouteLeave(to, from, next) {
            this.$Emitter.emit("beginTransition");

            this.$Emitter.on("endTransition", () => {
                next();
            });
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$Emitter.emit("afterTransition");
            });

        },
    }
</script>