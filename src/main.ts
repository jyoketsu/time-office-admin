import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BalmUI from "balm-ui"; // Official Google Material Components
import BalmUIPlus from "balm-ui-plus"; // BalmJS Team Material Components
import "balm-ui-css";

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(BalmUI, {
    $theme: {
      // (Optional) New in 9.28.0, See ThemeColor type in APIs.
      primary: "#2B8A9E",
    },
  })
  .use(BalmUIPlus)
  .mount("#app");
