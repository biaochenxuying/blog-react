![主页](https://upload-images.jianshu.io/upload_images/12890819-8420689b7238972a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 前言

此 blog 项目是基于 react 全家桶 + Ant Design 。

## 效果

效果图：

- pc 端

![首页](https://upload-images.jianshu.io/upload_images/12890819-4fb796cd5ac5282d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 移动端适配

![mobile.gif](https://upload-images.jianshu.io/upload_images/12890819-f97e98dfa9ac76b8.gif?imageMogr2/auto-orient/strip)

完整效果请看：[http://biaochenxuying.cn:2019/](http://biaochenxuying.cn:2019/)

## 功能描述

### 已经实现功能

- [x] 登录
- [x] 注册
- [x] 文章列表
- [x] 标签分类
- [x] 个人介绍
- [x] 点赞与评论
- [x] 留言
- [x] 时间轴
- [x] 项目展示
- [x] 发文（支持 MarkDown 语法）
- [x] 文章详情展示（支持代码语法高亮）
- [x] 移动端适配
- [x] 网站波浪效果(请看 https://biaochenxuying.cn/wave.html)
- [x] 第三方 github 授权登录
- [x] 文章归档
- [x] 文章详情的目录

`因为访问地址 http://biaochenxuying.cn:2019/ 加了端口 2019 ，所以体验线上的授权功能会受限`

`完整功能请访问 vue + typescript + element-ui 版的 https://biaochenxuying.cn`

### 待实现功能

- [ ] 无

## 前端技术

- react： ^16.8.4
- antd： ^3.15.0
- react-router:：^4.3.1
- webpack： 4.28.3
- axios：0.18.0
- redux: ^4.0.1
- highlight.js： ^9.15.6
- marked：^0.6.1

## 项目搭建

- 项目是按 antd 推荐的教程来搭建的：[antd 在 create-react-app 中使用](https://ant.design/docs/react/use-with-create-react-app-cn) , 实现了 按需加载组件代码和样式。

## 主要项目结构

```
- components
  - article 文章详情
  - articles 文章列表
  - comments 评论
  - loadEnd 加载完成
  - loading 加载中
  - login 登录
  - message 留言
  - nav 导航
  - project 项目
  - register 注册
  - slider 右边栏（博主 logo 、链接和标签等）
  - artchive 归档
  - timeLine 时间轴(历程)
- router 路由
- store redux 的状态管理
- utils 封装的常用的方法
- views 框架页面
```

## 注意点

- 关于 页面

对于 关于 的页面，其实是一篇文章来的，根据文章类型 type 来决定的，数据库里面 type 为 3
的文章，只能有一篇就是 博主介绍 ；达到了想什么时候修改内容都可以。

所以当 this.props.location.pathname === '/about' 时就是请求类型为 博主介绍 的文章。

```
type: 3, // 文章类型: 1：普通文章；2：是博主简历；3 ：是博主简介；
```

## Build Setup ( 建立安装 )

```
# install dependencies
npm install

# serve with hot reload at localhost: 3000
npm start 或者 yarn start

# build for production with minification
npm run build 或者 yarn run build
```

如果要看完整的效果，是要和后台项目 **[blog-node](https://github.com/biaochenxuying/blog-node)** 一起运行才行的，不然接口请求会失败。

虽然引入了 mock 了，但是还没有时间做模拟数据，想看具体效果，请稳步到我的网站上查看 [http://biaochenxuying.cn:2019](http://biaochenxuying.cn:2019)

## 项目地址与文档教程

其他具体的业务代码，都是些常会见到的需求，这里就不展开讲了。

**项目地址：**

> [前台展示: https://github.com/biaochenxuying/blog-react](https://github.com/biaochenxuying/blog-react)

> [前台展示: https://github.com/biaochenxuying/blog-vue-typescript](https://github.com/biaochenxuying/blog-vue-typescript)

> [管理后台：https://github.com/biaochenxuying/blog-react-admin](https://github.com/biaochenxuying/blog-react-admin)

> [后端：https://github.com/biaochenxuying/blog-node](https://github.com/biaochenxuying/blog-node)

> [blog：https://github.com/biaochenxuying/blog](https://github.com/biaochenxuying/blog)

**本博客系统的系列文章：**

- 1. [react + node + express + ant + mongodb 的简洁兼时尚的博客网站](https://biaochenxuying.cn/articleDetail?article_id=5bf57a8f85e0f13af26e579b)
- 2. [react + Ant Design + 支持 markdown 的 blog-react 项目文档说明](https://biaochenxuying.cn/articleDetail?article_id=5bf6bb5e85e0f13af26e57b7)
- 3. [基于 node + express + mongodb 的 blog-node 项目文档说明](https://biaochenxuying.cn/articleDetail?article_id=5bf8c57185e0f13af26e7d0d)
- 4. [服务器小白的我,是如何将 node+mongodb 项目部署在服务器上并进行性能优化的](https://biaochenxuying.cn/articleDetail?article_id=5bfa728bb54f044b4f9da240)
- 5. [github 授权登录教程与如何设计第三方授权登录的用户表](https://biaochenxuying.cn/articleDetail?article_id=5c7bd34e42b55e2ecc90976d)
- 6. [一次网站的性能优化之路 -- 天下武功，唯快不破](https://biaochenxuying.cn/articleDetail?article_id=5c8ca2d3b87b8a04f1860c9a)
- 7. [Vue + TypeScript + Element 搭建简洁时尚的博客网站及踩坑记](https://biaochenxuying.cn/articleDetail?article_id=5c9d8ce5f181945ddd6b0ffc)
- 8. [前端解决第三方图片防盗链的办法 - html referrer 访问图片资源403问题](https://biaochenxuying.cn/articleDetail?article_id=5cfcc6798090bd3c84138a08)

## 最后

如果您觉得本项目和文章不错或者对你有所帮助，请给个星吧，你的肯定就是我继续创作的最大动力。

鉴于问问题的人有点多，笔者时间有限，处理不过来，大家可以加入 QQ 群：**186045338**，加群暗号：**全栈修炼** ，一起相互交流学习。

笔者经常在这里 BB：

![全栈修炼](https://upload-images.jianshu.io/upload_images/12890819-9399d149e09f638e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
