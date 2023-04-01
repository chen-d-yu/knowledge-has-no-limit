import { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './style/tailwind.postcss'
import './style/global.css'

const theme: Theme = {
  Layout,
  enhanceApp({ app, router, siteData }) {}
}

export default theme
