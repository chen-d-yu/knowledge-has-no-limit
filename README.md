```bash
# 安装全局依赖
# -D --dev:开发依赖  -w:(--workspace-root)
# pnpm i <packageName> -w -D
$ pnpm i typescript -w -D

# 安装子包依赖
# pnpm add <packageName> [--filter/-F] [childPackage]
# eg:
$ pnpm add react --filter @packages/react-core
```