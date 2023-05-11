#!/bin/bash
# 自动推送同步两个仓库

# 确保脚本抛出遇到的错误
set -e

git add .

git commit -m $1

git push origin master
git push git@github.com:chen-d-yu/knowledge-has-no-limit.git master