#!/bin/bash
# 自动推送同步两个仓库
git add .

git commit -m '同步代码'

git push origin master
git push gitee master