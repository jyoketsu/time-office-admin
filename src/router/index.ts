import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";
import Login from "../views/login/index.vue";
import Welcome from "../views/welcome/index.vue";
import Card from "../views/card/index.vue";
import CardFieldType from "../views/cardFieldType/index.vue";

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      { path: "card", component: Card },
      { path: "field-type", component: CardFieldType },
    ],
  },
  { path: "/welcome", component: Welcome },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
