require('./bootstrap');

import VueRouter from "vue-router";
import Vuex from "vuex";
import Index from "./Index";
import router from "./routes";
import moment from "moment";

import StarRating from "./shared/components/StarRating";
import FatelError from "./shared/components/FatelError";
import Success from "./shared/components/Success";
import RotatingCog from "./shared/components/RotatingCog.vue";
import validationErrors from "./shared/components/validationErrors";
import storeDefinition from "./store";

window.Vue = require('vue');
// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('example-2', require('./components/Example2.vue').default);

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.component("star-rating", StarRating);
Vue.component("fatel-error", FatelError);
Vue.component("success", Success);
Vue.component("v-errors", validationErrors);
Vue.component("rotatingCog", RotatingCog);

const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        "index": Index,
    },
    async beforeCreate() {
      this.$store.dispatch("loadStoredState");  
      
      // await axios.get('/sanctum/csrf-cookie');
      // await axios.post('/login', {
      //   email: 'sgreenholt@example.org',
      //   password: 'password'
      // });
      
      await axios.get('/user');
    },
    
});
