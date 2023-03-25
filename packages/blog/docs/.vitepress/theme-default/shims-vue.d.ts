// 代码一
//必需export 否则会导致路由找不到文件及main.ts产生错误
export {};

declare module "vue" {
  interface ComponentCustomProperties {
    $frontmatter: any;
  }
}
