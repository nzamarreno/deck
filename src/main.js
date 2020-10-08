require('dotenv').config()
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import Welcome from './views/Welcome/index.vue';
import Selection from './views/Selection/index.vue';
import Board from './views/Board/index.vue';
import App from "./views/App/index.vue";
import VueRouter from "vue-router";
import {VueSocket} from "./core/utilities/VueSocket"
import {GraphClient} from "./core/utilities/graphClient";
import {Emitter} from "./core/utilities/emitter";

Vue.prototype.$VueSocket = new VueSocket();
Vue.prototype.$GraphClient = new GraphClient();
Vue.prototype.$Emitter = new Emitter();

const routes = [
    { path: '/', component:  Welcome },
    { path: '/selection', component:  Selection },
    { path: '/board/:id', component:  Board }
];

const router = new VueRouter({
    routes
});

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');


// Point
// Shader