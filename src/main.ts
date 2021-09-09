import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
// import "../theme/index.css";
import "./assets/style/element-variables.scss";

const app = createApp(App);
app.use(store).use(router).use(ElementPlus).mount("#app");
