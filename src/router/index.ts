import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";
import Login from "../views/login/index.vue";

const routes = [
  // { path: "/", redirect: "/home" },
  { path: "/", component: Home },
  { path: "/Login", component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
