import VueRouter from "vue-router";
import ExampleComponent from "./components/ExampleComponent.vue";
import Example2 from "./components/Example2.vue";

const routes = [
   { 
      path: "/", 
      component: ExampleComponent,
      name: "home",
   },
   { 
      path: "/extwo", 
      component: Example2,
      name: "extwo",
   },
];

const router = new VueRouter({ 
   mode: 'history',
   routes,
 });
 
 export default router;