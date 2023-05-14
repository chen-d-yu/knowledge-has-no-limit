#!/bin/bash
# 自动推送同步两个仓库

# 确保脚本抛出遇到的错误
set -e

git add .

git commit -m $1

git push github master
git push origin master