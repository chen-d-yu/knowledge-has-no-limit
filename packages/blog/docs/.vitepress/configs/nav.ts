import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '键入佳境',
    items: [
      { text: 'HTML&CSS', link: '/fe/html&css/html' },
      { text: 'Javascript', link: '/fe/javascript/base/func' },
      { text: 'TypeScript', link: '/fe/typescript/base' }
    ],
    activeMatch: '^/fe'
  },
  {
    text: '源码学习',
    link: '/analysis/react/18',
    activeMatch: '^/analysis'
  },
  {
    text: 'Framework',
    items: [
      {
        text: '移动端',
        items: [
          { text: '微信小程序', link: '/framework/applet/' },
          { text: 'uniapp', link: '/framework/applet/uniapp' },
          { text: 'React Native', link: '/framework/mobile/react-native' }
        ]
      },
      {
        text: 'react',
        items: [
          { text: 'React', link: '/framework/react/' },
          { text: 'React Redux', link: '/framework/react/redux' }
        ]
      },
      {
        text: 'vue',
        items: [
          { text: 'Vue2', link: '/framework/vue/' },
          { text: 'Vue3', link: '/framework/vue/vue3' },
          { text: 'Vuex', link: '/framework/vue/vuex' }
        ]
      }
    ],
    activeMatch: '^/framework'
  },
  { text: 'Node', link: '/node/', activeMatch: '^/node' },
  {
    text: 'Workflow',
    items: [{ text: '开发规范', link: '/workflow/develop-spec' }],
    activeMatch: '^/workflow'
  },
  {
    text: '踩坑日记',
    link: '/pit/npm',
    activeMatch: '^/pit'
  }
]
