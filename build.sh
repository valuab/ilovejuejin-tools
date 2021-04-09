#!/bin/bash

# 打包
npm run build

# 新建一个 dist 目录
rm -rf ./dist
mkdir dist

# 拷贝文件
cp -a {.nuxt,static,package.json,tsconfig.json,nuxt.config.ts} ./dist/
cd ./dist
rm ./dist.zip
zip -r -q ../dist.zip ./*
