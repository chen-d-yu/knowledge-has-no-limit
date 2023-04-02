import { defineConfig } from 'vitepress'

export default defineConfig({
  outDir: '../dist',
  base: '/',

  lang: 'zh-CN',
  title: '茂茂物语',
  description: '茂茂的成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true
  },

  /* 主题配置 */
  themeConfig: {}
})
