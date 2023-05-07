import { defineConfig } from 'vitepress'
import { head, nav, sidebar } from './configs'

export default defineConfig({
  base: '/knowledge-has-no-limit/', // /表示当前脚本 `vitepress dev [目录]` 的根目录

  head,

  lang: 'zh-CN',
  title: '左右',
  description: '为学日益，为道日损',

  // 最近更新时间
  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true
  },

  /* 主题配置 */
  themeConfig: {
    logo: '/logo.svg',

    nav,
    sidebar,

    lastUpdatedText: '上次更新于',

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2019-present maomao'
    }

    /* Algolia DocSearch 配置 */
    // algolia: {
    //   appId: 'UVB82VCF2Y',
    //   apiKey: '4c67197afadb283c77e084bd50618c60',
    //   indexName: 'fe-mm',
    //   placeholder: '搜索',
    //   translations: {
    //     button: {
    //       buttonText: '搜索',
    //       buttonAriaLabel: '搜索'
    //     },
    //     modal: {
    //       searchBox: {
    //         resetButtonTitle: '清除查询条件',
    //         resetButtonAriaLabel: '清除查询条件',
    //         cancelButtonText: '取消',
    //         cancelButtonAriaLabel: '取消'
    //       },
    //       startScreen: {
    //         recentSearchesTitle: '搜索历史',
    //         noRecentSearchesText: '没有搜索历史',
    //         saveRecentSearchButtonTitle: '保存至搜索历史',
    //         removeRecentSearchButtonTitle: '从搜索历史中移除',
    //         favoriteSearchesTitle: '收藏',
    //         removeFavoriteSearchButtonTitle: '从收藏中移除'
    //       },
    //       errorScreen: {
    //         titleText: '无法获取结果',
    //         helpText: '你可能需要检查你的网络连接'
    //       },
    //       footer: {
    //         selectText: '选择',
    //         navigateText: '切换',
    //         closeText: '关闭',
    //         searchByText: '搜索提供者'
    //       },
    //       noResultsScreen: {
    //         noResultsText: '无法找到相关结果',
    //         suggestedQueryText: '你可以尝试查询',
    //         reportMissingResultsText: '你认为该查询应该有结果？',
    //         reportMissingResultsLinkText: '点击反馈'
    //       }
    //     }
    //   }
    // }
  }
})
