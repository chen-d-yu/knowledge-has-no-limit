import type { DefaultTheme } from 'vitepress'
import * as fs from 'fs'
import * as path from 'path'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'HTML&CSS',
      collapsed: false,
      items: [
        { text: 'HTML', link: '/fe/html&css/html' },
        { text: 'CSS', link: '/fe/html&css/css' }
      ]
    },
    {
      text: 'JavaScript',
      items: [
        // {
        //   text: '基础',
        //   link: '/fe/javascript/base/func',
        //   collapsed: false,
        //   items: [{ text: '函数', link: '/fe/javascript/base/func' }]
        // },
        {
          text: '进阶',
          link: '/fe/javascript/advanced/new',
          collapsed: true,
          items: [
            { text: 'new关键字', link: '/fe/javascript/advanced/new' },
            { text: 'this', link: '/fe/javascript/advanced/this' },
            { text: '箭头函数', link: '/fe/javascript/advanced/arrow-func' },
            { text: '浏览器渲染原理', link: '/fe/javascript/advanced/b-r-p' },
            { text: '属性描述符', link: '/fe/javascript/advanced/attr-desc' }
          ]
        },
        // { text: 'ES6+', collapsed: true, items: [{ text: 'storage存储', link: '/fe/javascript/es6/storage' }] },
        {
          text: '大话系列',
          collapsed: true,
          items: [
            { text: '大话原型链', link: '/fe/javascript/gossip/prototype' }
            // { text: '大话Promise', link: '/fe/javascript/gossip/promise' }
          ]
        }
      ]
    }
    // {
    //   text: 'TypeScript',
    //   link: '/fe/typescript/base',
    //   collapsed: false,
    //   items: [
    //     { text: '基础', link: '/fe/typescript/base' },
    //     { text: '配置', link: '/fe/typescript/config' },
    //     { text: '类型体操', link: '/fe/typescript/gymnastics' }
    //   ]
    // }
  ],
  '/analysis/': [
    {
      text: 'React',
      items: [{ text: 'React 18 源码学习', link: '/analysis/react/18' }]
    }
  ],
  '/framework/': [
    {
      text: '移动端',
      collapsed: false,
      link: '/framework/applet/',
      items: [
        { text: '微信小程序', link: '/framework/applet/' },
        { text: 'uniapp', link: '/framework/applet/uniapp' },
        { text: 'React Native', link: '/framework/mobile/react-native' }
      ]
    },
    {
      text: 'Vue',
      collapsed: false,
      link: '/framework/vue/',
      items: [
        { text: 'Vue2', link: '/framework/vue/' },
        { text: 'Vue3', link: '/framework/vue/vue3' },
        { text: 'Vuex', link: '/framework/vue/vuex' }
      ]
    },
    {
      text: 'React',
      collapsed: false,
      link: '/framework/react/',
      items: [
        { text: 'React', link: '/framework/react/' },
        { text: 'React-Redux', link: '/framework/react/redux' }
      ]
    }
  ],
  '/node/': [
    {
      text: 'Node',
      link: '/note/node/',
      items: [
        { text: 'express', link: '/node/express' },
        { text: 'koa', link: '/node/koa' },
        { text: 'nest', link: '/node/nest' }
      ]
    }
  ],
  '/workflow/': [
    {
      text: '开发规范',
      link: '/workflow/develop-spec'
    }
  ],
  '/pit/': [
    {
      text: '踩坑记录',
      items: [
        { text: 'npm 踩坑记录', link: '/pit/npm' },
        { text: 'PC 踩坑记录', link: '/pit/pc' },
        { text: 'H5 踩坑记录', link: '/pit/h5' }
      ]
    }
  ]
}
