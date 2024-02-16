import "./index.scss";
import ui from "./components/ui";
import { createApp } from "vue";
import App from "@/components/App/App.vue";
const app = createApp(App);
ui.map((component) => {
  app.component(component.name, component);
});
app.mount("#app");
