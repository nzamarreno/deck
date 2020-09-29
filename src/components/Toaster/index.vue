<template>
    <div class="toaster">
        <h6 class="toaster__title">Warning!</h6>
        <p class="toaster__desc">Oups! Something is wrong!</p>

        <p class="toaster__message">Don't worry! In few moment, you will be redirect on the selection page!</p>
    </div>
</template>

<script>
    import Vue from "vue";

    export default Vue.extend({
        props: ["title", "message", "description"]
    });
</script>