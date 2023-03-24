import { Theme } from "vitepress";
import Layout from "./Layout.vue";
import NotFound from "./NotFound.vue";
import MyButton from "../components/MyButton.vue";

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {
    app.component("MyButton", MyButton);
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  },
};

export default theme;
