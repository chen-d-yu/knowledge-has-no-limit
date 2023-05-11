import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ['link', { rel: 'icon', href: 'https://minio.sciento.cn/st-public/2/b125b88be9984dc0a42ce7d2adecdd98@logo.svg' }],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
    }
  ]
]
