import { createApp } from "vue";
import "vant/es/toast/style";
// import xx, { serverUrl as sss } from "./utils/tools"; // as 设置一个别名
import router from "./router";
import "./style.css";
import App from "./App.vue";

// console.log(sss);

const app = createApp(App);
app.use(router); // 使用路由
app.mount("#app");
