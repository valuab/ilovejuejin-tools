# djcars-newpc-web


## 注意事项

1. 项目使用 `create-nuxt-app` 构建项目
2. 项目使用 `nuxt-composition-api` 来使用 `ts` 开发 `vue`
3. 项目使用 `antd-vue` 作为项目组件库
4. 项目使用 `scss` 替换了 `css` 形式开发
5. 项目使用 `nuxt-typed-vuex` 形式来管理 `vuex`，使用 `$accessor` 来代替 `$store` 变量
6. 项目使用 `$http` 替换掉 `axios` 请求，所有 `api` 请求都写入这个模块中
7. 项目使用 `git-commit` 来管理 `git` 工作流，需要规范 `git` 提交信息
8. 微信登录使用了 "大家车" 网页应用账号

## 资源

```
测试域名: https://pcapi-beta.djcars.cn
正式域名: https://pc.djcars.cn
```
## 目录结构

```
├─api                                      ## api 相关目录
├─components                                
│  ├─display                               ## 布局相关组件
│  ├─global                                ## 全局组件
│  ├─operate                               ## 操作组件
│  └─popup                                 ## 弹窗组件
│          
├─config                                   ## 项目配置目录
├─hooks                                    ## hooks
├─layouts                                  ## 布局目录
├─middleware                               ## 中间件
├─pages                                     
│      categoryDetail.vue                  ## 
│      index.vue                           ## 首页
│      topicDetail.vue                     
│      topiclist.vue
│      
├─plugins                                  ## 插件
├─store                                    ## store
├─test                                     ## 测试目录
├─typings                                  ## 声明文件目录
└─utils                                    ## 业务相关库
        data.ts                            ## 处理业务相关模块
```
