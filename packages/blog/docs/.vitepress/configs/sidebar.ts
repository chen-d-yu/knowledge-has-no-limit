import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/pit/': [
    {
      text: '踩坑记录',
      items: [
        { text: 'npm 踩坑记录', link: '/pit/npm' },
        { text: 'PC 踩坑记录', link: '/pit/pc' },
        {
          text: 'H5 踩坑记录',
          items: [
            { text: 'npm 踩坑记录', link: '/pit/npm' },
            { text: 'PC 踩坑记录', link: '/pit/pc' }
          ]
        }
      ]
    }
  ]
}
