import DefaultTheme from 'vitepress/theme'
import Layout from '@/theme/pages/Layout.vue'
import NotFound from '@/theme/pages/NotFound.vue'
import './styles/index.less'

export default <typeof DefaultTheme>{
  Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {}
}
