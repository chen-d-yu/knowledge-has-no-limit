import { defineConfig } from 'vitepress'

export default defineConfig({
  outDir: '../dist',
  base: process.env.APP_BASE_PATH || '/',

  lang: 'zh-CN',
  title: '左右',
  description: '测试个人博客',

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true
  },

  /* 自定义主题配置 */
  themeConfig: {}
})
