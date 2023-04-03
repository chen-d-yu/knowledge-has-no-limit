https://zhuanlan.zhihu.com/p/522093254

# 自定义主题技术留档

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
       "env": {
           "browser": true,
           "es2021": true,
           "node": true
       },
       "extends": "plugin:vue/vue3-essential",
       "overrides": [
       ],
       "parser": "@typescript-eslint/parser",
       "parserOptions": {
           "ecmaVersion": "latest",
           "sourceType": "module"
       },
       "plugins": [
           "vue",
           "@typescript-eslint"
       ],
       "rules": {
       }
   }
   ```

3. 现在来修改以下配置，参考***三季大佬***的配置

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
   pnpm -F @packages/blog add eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-vue -D
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

#### 创建空主题工程

1. 当前的目录结构

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

2. 自定义主题的优先级会高于默认主题，如果在 `.vitepress`下新建了 `theme`文件，那么就会覆盖默认主题

3. 在`theme`文件中导出主题

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
     
     const {Layout} = Theme
     </script>
     <template>
       <Layout>
       </Layout>
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

4. 在上面的全部配置完毕之后，在 `package.json` 中，配置启动脚本，测试一下刚才的配置是否全都成功

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

## day-02



