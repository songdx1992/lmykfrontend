import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Dashboard from "./views/Dashboard.vue";
import "../styles/global.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);
app.mount("#app");
