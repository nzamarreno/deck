<template>
    <div class="test-wrapper">
        <div class="test hide">
        </div>
        <div class="test-content">
            hello
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