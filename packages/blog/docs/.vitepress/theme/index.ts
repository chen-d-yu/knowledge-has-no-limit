import { Theme } from 'vitepress'
import Layout from './pages/Layout.vue'
import NotFound from './pages/NotFound.vue'
import './styles/index.less'

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {}
}

export default theme
