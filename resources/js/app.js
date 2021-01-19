require('./bootstrap');

import VueRouter from "vue-router";
import Index from "./Index";
import router from "./routes";

window.Vue = require('vue');
// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('example-2', require('./components/Example2.vue').default);

Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,
    components: {
        "index": Index,
    },
    
});
