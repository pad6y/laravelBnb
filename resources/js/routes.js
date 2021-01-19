import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables";
import Example2 from "./components/Example2";

const routes = [
   { 
      path: "/", 
      component: Bookables,
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