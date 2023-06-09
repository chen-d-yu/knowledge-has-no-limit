#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 进入博客仓库
cd packages/blog

# 生成静态文件
pnpm run build

# 进入生成的文件夹
cd docs/.vitepress/dist

cp -r ../../../../../.github ./

git init
git add -A
git commit -m 'deploy'

# 发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/chen-d-yu/knowledge-has-no-limit.git master:gh-pages
git push -f https://gitee.com/chen-d-yu/knowledge-has-no-limit.git master:gh-pages

cd -