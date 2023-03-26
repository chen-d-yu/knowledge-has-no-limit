import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import CustomLayout from "@/pages/Layout.vue";

export const BlogTheme: Theme = {
  ...DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app, router, siteData }) {},
};

export default BlogTheme;
