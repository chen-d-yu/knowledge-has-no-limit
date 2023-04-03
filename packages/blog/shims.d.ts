/// <reference types="vitepress/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  interface ComponentCustomProperties {
    $frontmatter: any
  }
  const component: DefineComponent<{}, {}, any>
  export default component
}
