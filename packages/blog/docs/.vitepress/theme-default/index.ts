import { Theme } from "vitepress";
import Layout from "./Layout.vue";
import NotFound from "./NotFound.vue";
import MyButton from "../components/MyButton.vue";

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {
    app.component("MyButton", MyButton);
  },
};

export default theme;
