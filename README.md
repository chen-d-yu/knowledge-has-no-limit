```bash
# 安装全局依赖
# -D --dev:开发依赖  -w:(--workspace-root)
# pnpm i <packageName> -w -D
$ pnpm i typescript -w -D

# 安装子包依赖
# pnpm add <packageName> [--filter/-F] [childPackage]
# eg:
$ pnpm add react --filter @packages/react-core

# 添加子包
# 1.新建文件夹
# 2.初始化package.json
# 3.将子包的name修改为"name": "@packages/packageName"
```
