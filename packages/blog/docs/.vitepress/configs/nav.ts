import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '踩坑记录',
    link: '/pit/npm',
    activeMatch: '^/pit'
  }
]
