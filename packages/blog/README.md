https://zhuanlan.zhihu.com/p/522093254

# 自定义vitepress主题留档

> 自定义vitepress博客主题每次编码进行的留档

## day-01

### 配置

#### prettier

1. 安装

   ```bash
   yarn add prettier -D # prettier相关
   ```

2. 新建`.prettierrc`并修改配置

   ```js
   module.exports = {
     tabWidth: 2,
     semi: false,
     trailingComma: 'none',
     singleQuote: true,
     printWidth: 120,
     arrowParens: 'always',
     bracketSpacing: true,
     endOfLine: 'auto',
     useTabs: false,
     quoteProps: 'as-needed',
     jsxSingleQuote: true,
     jsxBracketSameLine: false,
     rangeStart: 0,
     rangeEnd: Infinity,
     requirePragma: false,
     insertPragma: false,
     proseWrap: 'never',
     htmlWhitespaceSensitivity: 'css'
   }
   ```

#### eslint

1. 初始化文件

   ```shel
   npx eslint --init
   ```

2. 按照终端提示，生成的配置文件

   ```js
   module.exports = {
     env: {
       browser: true,
       es2021: true,
       node: true
     },
     extends: 'plugin:vue/vue3-essential',
     overrides: [],
     parser: '@typescript-eslint/parser',
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module'
     },
     plugins: ['vue', '@typescript-eslint'],
     rules: {}
   }
   ```

3. 现在来修改以下配置，参考**_三季大佬_**的配置

   ```js
   module.exports = {
     env: {
       browser: true,
       es2021: true,
       node: true
     },
     extends: [
       'eslint:recommended',
       'plugin:vue/vue3-essential',
       'plugin:@typescript-eslint/recommended',
       'plugin:prettier/recommended'
     ],
     overrides: [],
     parser: 'vue-eslint-parser',
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
       parser: '@typescript-eslint/parser'
     },
     plugins: ['vue', '@typescript-eslint'],
     rules: {
       '@typescript-eslint/no-explicit-any': 'off',
       'no-debugger': 'warn',
       'prettier/prettier': [
         'error',
         {
           semi: false,
           trailingComma: 'none',
           arrowParens: 'avoid',
           singleQuote: true,
           endOfLine: 'auto'
         }
       ],
       'vue/return-in-computed-property': 'off',
       'vue/no-multiple-template-root': 'off',
       'vue/multi-word-component-names': 'off'
     }
   }
   ```

4. 安装依赖

   ```shell
   pnpm -F @packages/blog add eslint-configs-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-vue -D
   ```

5. 添加忽略文件，也是参考大佬的配置

   ```
   src/assets
   src/icons
   public
   dist
   node_modules
   index.html
   *.sh
   *.md
   *.woff
   *.ttf
   .vscode
   .idea
   /docs
   .husky
   .local
   /bin
   Dockerfile
   ```

#### ts

1. 初始化配置文件

   ```bash
   npx tsc --init
   ```

2. 在生成的配置文件中修改配置

   ```json
   {
     "compilerOptions": {
       "module": "ESNext",
       "baseUrl": ".",
       "target": "es2016",
       "lib": ["DOM", "ESNext"],
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "noUnusedLocals": true,
       "moduleResolution": "node",
       "resolveJsonModule": true,
       "strictNullChecks": true,
       "forceConsistentCasingInFileNames": true,
       "types": ["vite/client", "node"]
     },
     "include": ["./*.ts", "./.vitepress/**/*.ts", "./.vitepress/**/*.vue"],
     "exclude": ["**/dist/**", "node_modules"]
   }
   ```

#### vite

1. 安装依赖

   ```shell
   yarn add vite -D # vite相关
   ```

2. 新建`vite.config.ts`并修改配置

   ```ts
   import { defineConfig } from 'vite'
   import { fileURLToPath } from 'url'

   export default defineConfig({
     server: {
       port: 3000,
       hmr: {
         overlay: false
       }
     },
     resolve: {
       alias: {
         '@': fileURLToPath(new URL('./.vitepress/', import.meta.url))
       },
       extensions: ['.js', '.json', '.ts'],
       preserveSymlinks: true
     }
   })
   ```

3. 注意：`vite.config.ts`文件要和`.vitepress`放在同级目录下，别名才会生效

#### tailwindcss

1. 安装依赖

   ```shell
   yarn add @tailwindcss/postcss7-compat autoprefixer postcss -D
   ```

2. 初始化配置文件

   ```shell
   npx tailwindcss init -p
   ```

3. 在生成的配置文件并修改配置

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     // - purge:{...}
     // + content:[...]
     content: ['./docs/.vitepress/**/*.{js,ts,vue}', './docs/**/*.md'],
     darkMode: 'class', // or 'media' or 'class'
     theme: {
       extend: {}
     },
     variants: {
       extend: {}
     },
     plugins: []
   }
   ```

4. 使用

   - 入口文件引入`tailwindcss`

     ```ts
     import DefaultTheme from 'vitepress/theme'
     import Layout from '@/theme/pages/Layout.vue'
     import NotFound from '@/theme/pages/NotFound.vue'
     import './styles/tailwind.postcss'

     export default <typeof DefaultTheme>{
       Layout,
       NotFound,
       enhanceApp({ app, router, siteData }) {}
     }
     ```

   - 提示缺少文件，新建`tailwind.postcss`并写入以下内容

     ```postcss
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

### 实战

#### 主题工程架构

```
|-- blog
    |-- ...other file
    |-- demo
        |-- .vitepress
        |-- |-- config.ts # blog's configuration
        |-- |-- theme
        |-- |-- |-- index.ts # theme entry
        |-- |-- |-- pages
        |-- |-- |-- |-- Layout.vue # layout file
        |-- |-- |-- |-- NotFound.vue
        |-- |-- |-- |components
        |-- |-- |-- |-- ...vueComponents
    |-- |-- vite.config.ts
    |-- package.json
    |-- .gitignore
    |-- .prettierrc.js
    |-- tsconfig.json
    |-- tailwind.config.js
    |-- postcss.config.js
    |-- .prettierrc.js
    |-- shims.d.ts
    |-- .eslintignore
    |-- .eslintrc.js
```

#### 自定义主题

1. 自定义主题的优先级会高于默认主题，如果在 `.vitepress`下新建了 `theme`文件，那么就会覆盖默认主题

2. 在`theme`文件中导出主题

   - theme/index.ts

     ```ts
     import DefaultTheme from 'vitepress/theme'
     import Layout from '@/theme/pages/Layout.vue'
     import NotFound from '@/theme/pages/NotFound.vue'
     import './styles/index.less'

     export default <typeof DefaultTheme>{
       Layout,
       NotFound,
       enhanceApp({ app, router, siteData }) {}
     }
     ```

   - theme/pages/Layout.vue

     ```vue
     <script lang="ts" setup>
     import Theme from 'vitepress/theme'

     const { Layout } = Theme
     </script>
     <template>
       <Layout> </Layout>
     </template>
     <style></style>
     ```

   - theme/pages/NotFound.vue

     ```vue
     <template>
       <div>404</div>
     </template>
     <script lang="ts" setup></script>
     <style></style>
     ```

3. 在上面的全部配置完毕之后，在 `package.json` 中，配置启动脚本，测试一下刚才的配置是否全都成功

   ```json
   {
     "scripts": {
       "dev": "vitepress dev demo",
       "build:docs": "vitepress build demo",
       "serve": "vitepress serve demo"
     }
   }
   ```

   ![img.png](assets/start-success.png)

   出现以上画面，证明自定义工程已经搭建成功，继续加油吧！！

4. 文档配置文件，`.vitepress/config.ts`

   主要是主题的全局配置，一般是侧边栏、导航栏、footer等配置

   ```ts
   import { defineConfig } from 'vitepress'
   
   export default defineConfig({
     outDir: '../dist',
     base: '/', // /表示当前脚本 `vitepress dev [目录]` 的根目录
   
     lang: 'zh-CN',
     title: '左右',
     description: '为学日益，为道日损',
   
     lastUpdated: false,
     cleanUrls: true,
   
     /* markdown 配置 */
     markdown: {
       lineNumbers: true
     },
   
     /* 主题配置 */
     themeConfig: {
       // 测试目录
       nav: [{ text: '踩坑记录', link: '/pit/npm', activeMatch: '^/pit' }],
       sidebar: {
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
     }
   })
   ```

## day-02

博客原型：

> https://pixso.cn/app/share/f/0XANrW3c3kC08LpQMg81VJlBn7TtmtbH?isProduct=1

今天的任务是自定义**banner、导航栏以及hero插槽部分**

### banner

利用插槽`#home-hero-before`让盒子内容进行固定定位，插入图片作为`banner`

```vue
<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import {useData} from 'vitepress'
import {useWindowScroll} from '@vueuse/core'
import {computed} from 'vue'

const {Layout} = DefaultTheme

// 获取当前颜色模式，dark or auto
const {isDark} = useData()

// event
// 当前滚动高度
const {y} = useWindowScroll()
const scrollFlag = computed(() => y.value > 200)

/**
 * 滚动计算样式
 * 1.样式初始化
 * 2.设置滚动 [200px] 样式
 */
const navBarStyle = computed(() => ({
  background: isDark.value ? 'var(--vp-c-bg)' : scrollFlag.value ? '#fff' : 'initial',
  color: isDark.value ? '#fff' : scrollFlag.value ? 'var(--vp-c-text-1)' : '#fff',
  backdrop: isDark.value ? 'initial' : scrollFlag.value ? 'blur(16px)' : 'blur(20px)',
  top: isDark.value ? `calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) - ${y.value}px)` : `calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px - ${y.value}px)`
}))
</script>

<template>
  <Layout>
    <!-- 背景图 -->
    <template #home-hero-before>
      <div class="banner-wrap absolute top-0 left-0 w-full">
        <div class="banner-img bg-center bg-cover w-full bg-no-repeat" style="background-image: url('/bg12.jpg')"/>
      </div>
    </template>
    <!-- feature部分会嵌进banner，用空盒子撑开 -->
    <template #home-hero-after>
      <div class="empty-box h-6 sm:hidden lg:block lg:h-44"></div>
    </template>
  </Layout>
</template>

<style lang="less" scoped>

// banner
@media screen and  (max-width: 640px) {
  // 640px
  .banner-img {
    height: 540px;
  }
}


@media screen and (max-width: 768px) and (min-width: 640px) {
  // 640px ~ 768px
  .banner-img {
    height: 650px;
  }
}

@media screen and (max-width: 960px) and (min-width: 768px) {
  // 768px ~ 960px
  .banner-img {
    height: 650px;
  }
}

@media screen and (min-width: 960px) {
  // 960px +
  .banner-img {
    height: 600px;
  }
}
</style>
```

banner效果图如下：

![banner效果图](C:\Users\zuoyou\AppData\Roaming\Typora\typora-user-images\image-20230405185358610.png)

banner已经实现，但是导航栏还有点小缺陷【导航栏字体颜色不明显】，会在下一环节采用样式覆盖修复

![image-20230405185735496](C:\Users\zuoyou\AppData\Roaming\Typora\typora-user-images\image-20230405185735496.png)

### 导航栏

当前环节主要是解决导航栏在`颜色主题`下的字体颜色，以及在`banner`下的字体颜色

以及判断当前主题是否`auto`或者`dark`

```vue
<style lang="less" scoped>
// ......
// +++ 新增样式 +++
// 导航栏
:deep(.VPNav) {
  .active {
    color: var(--vp-c-brand) !important;
  }

  .VPNavBar .VPNavBarTitle .title {
    color: v-bind("page.isNotFound ? '#00' :'#fff'");
  }

  .VPNavBar:not(.has-sidebar) {
    background: v-bind("isDark ? 'var(--vp-c-bg)' : 'transparent'");
    border-bottom: v-bind("isDark ? '1px solid #000' : page.isNotFound ? '1px solid var(--vp-c-gutter)' : '1px solid transparent'");
    backdrop-filter: blur(20px);

    .VPMenuGroup {
      .title {
        color: #fff;
      }
    }

    .VPNavBarHamburger {
      .top,
      .middle,
      .bottom {
        background-color: v-bind("isDark ? '#fff' : page.isNotFound ? '#000' :'#fff'");
      }
    }

    .VPNavBarSearch {
      .DocSearch-Search-Icon {
        color: #fff;
      }
    }
  }

  .VPNavBar .has-sidebar {
    .title {
      color: var(--vp-c-text-1);
    }

    .VPNavBarHamburger {
      .top,
      .middle,
      .bottom {
        background-color: var(--vp-c-text-1);
      }
    }
  }

  .VPNavScreen {
    top: v-bind("navBarStyle.top");
  }
}

@media screen and (min-width: 768px) {
  // 768px +
  :deep(.VPNav) {
    .VPNavBar:not(.has-sidebar) {
      .VPMenuGroup {
        .title {
          color: var(--vp-c-text-2);
        }
      }
    }

    .VPNavBarMenu .VPNavBarMenuLink {
      color: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .VPNavBarMenuGroup .text {
      color: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .VPNavBarExtra .icon {
      fill: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .DocSearch-Button {
      background-color: var(--vp-c-bg-alt);
      color: var(--vp-c-text-2);
    }

    .DocSearch-Search-Icon {
      color: var(--vp-c-text-2) !important;
    }
  }
}

@media screen and (min-width: 960px) {
  // 960px +
  :deep(.VPNav) {
    .VPNavBar.fill:not(.has-sidebar) {
      background-color: v-bind('navBarStyle.background');
      backdrop-filter: v-bind('navBarStyle.backdrop');

      .content-body {
        background-color: initial;
      }

      .VPNavBarTitle .title {
        color: v-bind('navBarStyle.color');
      }

      .VPNavBarMenu .VPNavBarMenuLink {
        color: v-bind('navBarStyle.color');
      }

      .VPNavBarMenuGroup .text {
        color: v-bind('navBarStyle.color');
      }
    }

    .VPNavBar.has-sidebar {
      background: v-bind("isDark ? 'var(--vp-c-bg)' : '#fff'");

      .container > .title {
        .VPNavBarTitle {
          position: relative;
          z-index: 1;
        }

        &:after {
          z-index: 0;
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: var(--vp-sidebar-bg-color);
        }
      }

      .content-body {
        background-color: initial;
      }

      .VPNavBarTitle .title {
        color: var(--vp-c-text-1);
      }

      .VPNavBarMenu .VPNavBarMenuLink {
        color: var(--vp-c-text-1);
      }

      .VPNavBarMenuGroup .text {
        color: var(--vp-c-text-1);
      }
    }
  }
}
// +++ 新增样式 +++
</style>
```

### hero插槽

hero的完全自定义，因为要改变字体颜色，在对应地方新增代码

```vue
<template>
  <Layout>
    <!-- ... -->
    <!-- template新增内容 -->
    <!-- home-hero-info -->
    <template #home-hero-info>
      <div class="flex flex-col">
        <h1 class="name">
          <span class="clip">{{ frontmatter.hero.name }}</span>
        </h1>
        <p class="text">{{ frontmatter.hero.text }}</p>
        <p class="tagline">{{ frontmatter.hero.tagline }}</p>
      </div>
    </template>
    <!-- template新增内容 -->
  </Layout>
</template>

<style lang="less" scoped>
// ......
// +++ 新增样式内容 +++
// hero插槽
:deep(.VPHero.has-image) {
  .name, .text, .tagline {
    margin: 0 auto;
  }
}

.name {
  color: var(--vp-home-hero-name-color);

  .clip {
    background: var(--vp-home-hero-name-background);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: var(--vp-home-hero-name-color);
  }
}

.name, .text {
  max-width: 392px;
  letter-spacing: -.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.text {
  color: rgba(255, 255, 245, 0.95);
}

.tagline {
  color: rgba(235, 235, 245, 0.7);
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
}

@media screen and  (min-width: 640px) {
  // 640px ~ 960px
  .name, .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }

  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media screen and (min-width: 960px) {
  // 960px +
  .name, .text {
    line-height: 64px;
    font-size: 56px;
  }

  :deep(.VPHero.has-image) {
    .name, .text, .tagline {
      margin: 0;
    }
  }

  .tagline {
    line-height: 36px;
    font-size: 24px;
  }
}
// +++ 新增样式内容 +++
</style>
```

### feature末尾新增每日一言

```vue
<script lang="ts" setup>
// ......
// +++ 新增JavaScript +++
import {onMounted, ref} from 'vue'

// 每日一言
const daily = ref({
  content: "",
  author: ""
})

// 获取当前颜色模式，dark or auto
const {frontmatter} = useData()

// request
onMounted(() => {
  dailyWord()
})

/**
 * 每日一言：放在footer
 */
const dailyWord = async () => {
  try {
    const res: any = await dailyWordRequest({
      count: 1,
      app_id: "ltuct8nnnqxjcbiu",
      app_secret: "YzhxS2hhTFRCS2IvSlRMT3RTSkpaUT09"
    })
    daily.value = res.data[0]
  } catch (e) {
    console.log(e)
  } finally {

  }

}
const dailyWordRequest = (params: { count?: number, app_id: string, app_secret: string }) => {
  return new Promise((resolve, reject) => {
    let url = "https://www.mxnzp.com/api/daily_word/recommend"
    const paramsArr = Object.keys(params).map((item, index, arr) => {
      return `${item}=${params[item]}`
    })
    if (Object.keys(params).length !== 0) {
      url = url + "?" + paramsArr.join("&")
    }
    fetch(url, {
      method: "GET"
    })
        .then(res => res.json())
        .then(res => resolve(res))
  })
}
// +++ 新增JavaScript +++
</script>

<template>
  <Layout>
    <!-- ...... -->
    <!-- +++ 新增内容 +++ -->
    <template #home-features-after>
      <div class="footer-daily flex flex-col">
        <p class="content">{{ daily.content }}</p>
        <div class="author self-end">{{ `- ${daily.author}` || '--' }}</div>
      </div>
    </template>
    <!-- +++ 新增内容 +++ -->
  </Layout>
</template>

<style lang="less" scoped>
// ......
// +++ 新增样式 +++
// feature每日一言
.footer-daily {
  margin: 40px auto 0;
  max-width: 392px;
  font-size: 16px;
  font-weight: 600;

  .author {
    margin-top: 10px;
    font-weight: normal;
    font-size: 14px;
    opacity: 0.7;
  }
}

@media screen and  (min-width: 640px) {
  // 640px ~ 960px
  .footer-daily {
    margin: 60px auto 0;
    max-width: 576px;
    font-size: 18px;

    .author {
      margin-top: 20px;
      font-size: 16px;
    }
  }
}
// +++ 新增样式 +++
</style>
```

### 目前为止完整代码

```vue
<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import {useData} from 'vitepress'
import {useWindowScroll} from '@vueuse/core'
import {computed, onMounted, ref} from 'vue'

const {Layout} = DefaultTheme

// 每日一言
const daily = ref({
  content: "",
  author: ""
})

// 获取当前颜色模式，dark or auto
const {isDark, page, frontmatter} = useData()

// event
// 当前滚动高度
const {y} = useWindowScroll()
const scrollFlag = computed(() => y.value > 200)

/**
 * 滚动计算样式
 * 1.样式初始化
 * 2.设置滚动 [200px] 样式
 */
const navBarStyle = computed(() => ({
  background: isDark.value ? 'var(--vp-c-bg)' : scrollFlag.value ? '#fff' : 'initial',
  color: isDark.value ? '#fff' : scrollFlag.value ? 'var(--vp-c-text-1)' : '#fff',
  backdrop: isDark.value ? 'initial' : scrollFlag.value ? 'blur(16px)' : 'blur(20px)',
  top: isDark.value ? `calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) - ${y.value}px)` : `calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px - ${y.value}px)`
}))

// request
onMounted(() => {
  dailyWord()
})

/**
 * 每日一言：放在footer
 */
const dailyWord = async () => {
  try {
    const res: any = await dailyWordRequest({
      count: 1,
      app_id: "ltuct8nnnqxjcbiu",
      app_secret: "YzhxS2hhTFRCS2IvSlRMT3RTSkpaUT09"
    })
    daily.value = res.data[0]
  } catch (e) {
    console.log(e)
  } finally {}
}
const dailyWordRequest = (params: { count?: number, app_id: string, app_secret: string }) => {
  return new Promise((resolve, reject) => {
    let url = "https://www.mxnzp.com/api/daily_word/recommend"
    const paramsArr = Object.keys(params).map((item, index, arr) => {
      return `${item}=${params[item]}`
    })
    if (Object.keys(params).length !== 0) {
      url = url + "?" + paramsArr.join("&")
    }
    fetch(url, {
      method: "GET"
    })
        .then(res => res.json())
        .then(res => resolve(res))
  })
}
</script>

<template>
  <Layout>
    <!-- 背景图 -->
    <template #home-hero-before>
      <div class="banner-wrap absolute top-0 left-0 w-full">
        <div class="banner-img bg-center bg-cover w-full bg-no-repeat" style="background-image: url('/bg12.jpg')"/>
      </div>
    </template>
    <!-- feature部分会嵌进banner，用空盒子撑开 -->
    <template #home-hero-after>
      <div class="empty-box h-6 sm:hidden lg:block lg:h-44"></div>
    </template>

    <!-- home-hero-info -->
    <template #home-hero-info>
      <div class="flex flex-col">
        <h1 class="name">
          <span class="clip">{{ frontmatter.hero.name }}</span>
        </h1>
        <p class="text">{{ frontmatter.hero.text }}</p>
        <p class="tagline">{{ frontmatter.hero.tagline }}</p>
      </div>
    </template>

    <!-- daily每日一言 -->
    <template #home-features-after>
      <div class="footer-daily flex flex-col">
        <p class="content">{{ daily.content }}</p>
        <div class="author self-end">{{ `- ${daily.author}` || '--' }}</div>
      </div>
    </template>
  </Layout>
</template>

<style lang="less" scoped>
// banner
@media screen and  (max-width: 640px) {
  // 640px
  .banner-img {
    height: 540px;
  }
}


@media screen and (max-width: 768px) and (min-width: 640px) {
  // 640px ~ 768px
  .banner-img {
    height: 650px;
  }
}

@media screen and (max-width: 960px) and (min-width: 768px) {
  // 768px ~ 960px
  .banner-img {
    height: 650px;
  }
}

@media screen and (min-width: 960px) {
  // 960px +
  .banner-img {
    height: 600px;
  }
}

// 导航栏
:deep(.VPNav) {
  .active {
    color: var(--vp-c-brand) !important;
  }

  .VPNavBar .VPNavBarTitle .title {
    color: v-bind("page.isNotFound ? '#00' :'#fff'");
  }

  .VPNavBar:not(.has-sidebar) {
    background: v-bind("isDark ? 'var(--vp-c-bg)' : 'transparent'");
    border-bottom: v-bind("isDark ? '1px solid #000' : page.isNotFound ? '1px solid var(--vp-c-gutter)' : '1px solid transparent'");
    backdrop-filter: blur(20px);

    .VPMenuGroup {
      .title {
        color: #fff;
      }
    }

    .VPNavBarHamburger {
      .top,
      .middle,
      .bottom {
        background-color: v-bind("isDark ? '#fff' : page.isNotFound ? '#000' :'#fff'");
      }
    }

    .VPNavBarSearch {
      .DocSearch-Search-Icon {
        color: #fff;
      }
    }
  }

  .VPNavBar .has-sidebar {
    .title {
      color: var(--vp-c-text-1);
    }

    .VPNavBarHamburger {
      .top,
      .middle,
      .bottom {
        background-color: var(--vp-c-text-1);
      }
    }
  }

  .VPNavScreen {
    top: v-bind("navBarStyle.top");
  }
}

@media screen and (min-width: 768px) {
  // 768px +
  :deep(.VPNav) {
    .VPNavBar:not(.has-sidebar) {
      .VPMenuGroup {
        .title {
          color: var(--vp-c-text-2);
        }
      }
    }

    .VPNavBarMenu .VPNavBarMenuLink {
      color: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .VPNavBarMenuGroup .text {
      color: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .VPNavBarExtra .icon {
      fill: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .DocSearch-Button {
      background-color: var(--vp-c-bg-alt);
      color: var(--vp-c-text-2);
    }

    .DocSearch-Search-Icon {
      color: var(--vp-c-text-2) !important;
    }
  }
}


@media screen and (min-width: 960px) {
  // 960px +
  :deep(.VPNav) {
    .VPNavBar.fill:not(.has-sidebar) {
      background-color: v-bind('navBarStyle.background');
      backdrop-filter: v-bind('navBarStyle.backdrop');

      .content-body {
        background-color: initial;
      }

      .VPNavBarTitle .title {
        color: v-bind('navBarStyle.color');
      }

      .VPNavBarMenu .VPNavBarMenuLink {
        color: v-bind('navBarStyle.color');
      }

      .VPNavBarMenuGroup .text {
        color: v-bind('navBarStyle.color');
      }
    }

    .VPNavBar.has-sidebar {
      background: v-bind("isDark ? 'var(--vp-c-bg)' : '#fff'");

      .container > .title {
        .VPNavBarTitle {
          position: relative;
          z-index: 1;
        }

        &:after {
          z-index: 0;
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: var(--vp-sidebar-bg-color);
        }
      }

      .content-body {
        background-color: initial;
      }

      .VPNavBarTitle .title {
        color: var(--vp-c-text-1);
      }

      .VPNavBarMenu .VPNavBarMenuLink {
        color: var(--vp-c-text-1);
      }

      .VPNavBarMenuGroup .text {
        color: var(--vp-c-text-1);
      }
    }
  }
}

// hero插槽
:deep(.VPHero.has-image) {
  .name, .text, .tagline {
    margin: 0 auto;
  }
}

.name {
  color: var(--vp-home-hero-name-color);

  .clip {
    background: var(--vp-home-hero-name-background);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: var(--vp-home-hero-name-color);
  }
}

.name, .text {
  max-width: 392px;
  letter-spacing: -.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.text {
  color: rgba(255, 255, 245, 0.95);
}

.tagline {
  color: rgba(235, 235, 245, 0.7);
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
}

@media screen and  (min-width: 640px) {
  // 640px ~ 960px
  .name, .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }

  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media screen and (min-width: 960px) {
  // 960px +
  .name, .text {
    line-height: 64px;
    font-size: 56px;
  }

  :deep(.VPHero.has-image) {
    .name, .text, .tagline {
      margin: 0;
    }
  }

  .tagline {
    line-height: 36px;
    font-size: 24px;
  }
}


// feature每日一言
.footer-daily {
  margin: 40px auto 0;
  max-width: 392px;
  font-size: 16px;
  font-weight: 600;

  .author {
    margin-top: 10px;
    font-weight: normal;
    font-size: 14px;
    opacity: 0.7;
  }
}

@media screen and  (min-width: 640px) {
  // 640px ~ 960px
  .footer-daily {
    margin: 60px auto 0;
    max-width: 576px;
    font-size: 18px;

    .author {
      margin-top: 20px;
      font-size: 16px;
    }
  }
}
</style>
```

## day-03

- [ ] hero的图片，优化成一个酷炫的头像悬停
- [x] 添加loading页面

### 添加loading页面

> 暂时找到【say-my-life】的作为替代

```vue
<template>
  <transition name="fade" v-show="show">
    <div class="loading-page">
      <div class="loading-box">
        <p>加载中...</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.loading-page {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eee;

  .loading-box {
    width: 50px;
    height: 50px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    &:before {
      content: '';
      width: 50px;
      height: 5px;
      background: #000;
      opacity: 0.1;
      position: absolute;
      top: 59px;
      left: 0;
      border-radius: 50%;
      animation: shadow 0.5s linear infinite;
    }

    &:after {
      content: '';
      width: 50px;
      height: 50px;
      background: #46bd87;
      animation: animate 0.5s linear infinite;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 3px;
    }

    p {
      position: absolute;
      bottom: -100px;
      margin-left: -50px;
      left: 50%;

      white-space: nowrap;
      font-size: 20px;
    }
  }

  @keyframes animate {
    17% {
      border-bottom-right-radius: 3px;
    }
    25% {
      transform: translateY(9px) rotate(22.5deg);
    }
    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }
    75% {
      transform: translateY(9px) rotate(67.5deg);
    }
    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow {
    0%,
    100% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.2, 1);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
```

在Layout.vue做些修改

script新增代码

```vue
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import Loading from "@/theme/pages/Loading.vue";

const loadingShow = ref(true)

onMounted(() => {
  setTimeout(() => {
    loadingShow.value = false
  }, 2000)
})
</script>
```

template新增代码

```vue

<template>
  <Loading :show="loadingShow"/>
  <Layout>
    <!-- 背景图 -->
    <template #home-hero-before>
      <div class="banner-wrap absolute top-0 left-0 w-full">
        <div class="banner-img bg-center bg-cover w-full bg-no-repeat" style="background-image: url('/bg12.jpg')"/>
      </div>
    </template>
    <!-- feature部分会嵌进banner，用空盒子撑开 -->
    <template #home-hero-after>
      <div class="empty-box h-6 sm:hidden lg:block lg:h-44"></div>
    </template>

    <!-- home-hero-info -->
    <template #home-hero-info>
      <div class="flex flex-col">
        <h1 class="name">
          <span class="clip">{{ frontmatter.hero.name }}</span>
        </h1>
        <p class="text">{{ frontmatter.hero.text }}</p>
        <p class="tagline">{{ frontmatter.hero.tagline }}</p>
      </div>
    </template>

    <!-- daily每日一言 -->
    <template #home-features-after>
      <div class="footer-daily flex flex-col">
        <p class="content">{{ daily.hitokoto }}</p>
        <div class="author self-end">{{ `- ${daily.creator}` || '--' }}</div>
      </div>
    </template>
  </Layout>
</template>
```



