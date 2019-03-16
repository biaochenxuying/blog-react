![主页](https://upload-images.jianshu.io/upload_images/12890819-8420689b7238972a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 前言

此 blog 项目是基于 react 全家桶 + Ant Design  的，项目已经开源，项目地址在 github 上。

# 1. 效果


效果图：

- pc 端
![首页](https://upload-images.jianshu.io/upload_images/12890819-77a83e7ccd563d16.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 移动端适配

![mobile.gif](https://upload-images.jianshu.io/upload_images/12890819-f97e98dfa9ac76b8.gif?imageMogr2/auto-orient/strip)


完整效果请看：[http://biaochenxuying.cn/main.html](http://biaochenxuying.cn/main.html)

# 2. 功能描述

## 2.1 已经实现功能

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
- [X] 移动端适配
- [X] 网站波浪效果(请看 http://biaochenxuying.cn/wave.html)
- [X] 第三方 github 授权登录
- [X] 文章归档

## 2.2 待实现功能

- [ ] 文章分类 
- [ ] 文章详情的目录

# 3. 前端技术 

## 3.1 主要技术 

- react： 16.5.2
- antd： 3.9.3
- react-router:：4.3.1
- webpack： 3.8.1
- axios：0.18.0
- redux: 4.0.0
- highlight.js： 9.12.0
- marked：0.5.1

# 4. 项目搭建

- 项目是按 antd 推荐的教程来搭建的：[antd 在 create-react-app 中使用](https://ant.design/docs/react/use-with-create-react-app-cn) , 实现了 按需加载组件代码和样式。

# 5. 主要项目结构

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

# 6. markdown 渲染

markdown 渲染效果图: 

![markdown 渲染效果图](https://upload-images.jianshu.io/upload_images/12890819-cf92cfb3f222c4fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

react 相关的支持 markdown 语法的有 react-markdown，但不支持表格的渲染，所以没用。

markdown 渲染 采用了开源的 marked， 代码高亮用了 highlight.js 。

用法：

第一步：npm i marked highlight.js --save

```
npm i marked highlight.js --save
```

第二步： 导入

```
import marked from 'marked';
import hljs from 'highlight.js';
```

第三步： 设置

```
componentWillMount() {
		// marked相关配置
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false,
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			},
		});
	}
```
第四步：
```
<div className="content">
	<div
		id="content"
		className="article-detail"
		dangerouslySetInnerHTML={{
		      __html: this.state.articleDetail.content ? marked(this.state.articleDetail.content) : null,
			}}
		/>
	</div>
```

第五步：引入 monokai_sublime 的 css 样式

```
<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
```
第六步：对 markdown 样式的补充

如果不补充样式，是没有黑色背景的，字体大小等也会比较小，图片也不会居中显示

```
/*对 markdown 样式的补充*/
pre {
    display: block;
    padding: 10px;
    margin: 0 0 10px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #abb2bf;
    background: #282c34;
    word-break: break-all;
    word-wrap: break-word;
    overflow: auto;
}
h1,h2,h3,h4,h5,h6{
    margin-top: 1em;
    /* margin-bottom: 1em; */
}
strong {
    font-weight: bold;
}

p > code:not([class]) {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
}
p img{
    /* 图片居中 */
    margin: 0 auto;
    display: flex;
}

#content {
    font-family: "Microsoft YaHei",  'sans-serif';
    font-size: 16px;
    line-height: 30px;
}

#content .desc ul,#content .desc ol {
    color: #333333;
    margin: 1.5em 0 0 25px;
}

#content .desc h1, #content .desc h2 {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

#content .desc a {
    color: #009a61;
}

```

# 6. 主页的满屏 飘花洒落 的效果

![主页的 飘花洒落 的效果](https://upload-images.jianshu.io/upload_images/12890819-5915a8b8331a4def.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


大家也看到了，主页的满屏动态 飘花洒落 的效果很棒吧，这效果我也是网上找的，是在单独的一个 main.html 文件上的，代码链接如下：

[主页的满屏 飘花洒落 的效果](https://github.com/biaochenxuying/blog-react/blob/master/public/main.html)

# 7. 注意点

## 7.1 关于 页面

对于 关于 的页面，其实是一篇文章来的，根据文章类型 type 来决定的，数据库里面 type 为 3 
 的文章，只能有一篇就是 博主介绍 ；达到了想什么时候修改内容都可以。

所以当 this.props.location.pathname === '/about' 时就是请求类型为 博主介绍 的文章。

```
type: 3, // 文章类型: 1：普通文章；2：是博主简历；3 ：是博主简介；
```

# 8. Build Setup ( 建立安装 )

``` 
# install dependencies
npm install 

# serve with hot reload at localhost: 3000
npm start 或者 yarn start

# build for production with minification
npm run build 或者 yarn run build
```

如果要看完整的效果，是要和后台项目  **[blog-node](https://github.com/biaochenxuying/blog-node)** 一起运行才行的，不然接口请求会失败。

虽然引入了 mock 了，但是还没有时间做模拟数据，想看具体效果，请稳步到我的网站上查看 [http://biaochenxuying.cn/main.html](http://biaochenxuying.cn/main.html)

# 9. 项目地址与文档教程

其他具体的业务代码，都是些常会见到的需求，这里就不展开讲了。

**项目地址：**
> [前台展示: https://github.com/biaochenxuying/blog-react](https://github.com/biaochenxuying/blog-react)

> [管理后台：https://github.com/biaochenxuying/blog-react-admin](https://github.com/biaochenxuying/blog-react-admin)

> [后端：https://github.com/biaochenxuying/blog-node](https://github.com/biaochenxuying/blog-node)

> [blog：https://github.com/biaochenxuying/blog](https://github.com/biaochenxuying/blog)

**本博客系统的系列文章：**

- 1. [react + node + express + ant + mongodb 的简洁兼时尚的博客网站](http://biaochenxuying.cn/articleDetail?article_id=5bf57a8f85e0f13af26e579b)
- 2. [react + Ant Design + 支持 markdown 的 blog-react 项目文档说明](http://biaochenxuying.cn/articleDetail?article_id=5bf6bb5e85e0f13af26e57b7)
- 3. [基于 node + express + mongodb 的 blog-node 项目文档说明](http://biaochenxuying.cn/articleDetail?article_id=5bf8c57185e0f13af26e7d0d)
- 4. [服务器小白的我,是如何将node+mongodb项目部署在服务器上并进行性能优化的](http://biaochenxuying.cn/articleDetail?article_id=5bfa728bb54f044b4f9da240)
- 5. [github 授权登录教程与如何设计第三方授权登录的用户表](http://biaochenxuying.cn/articleDetail?article_id=5c7bd34e42b55e2ecc90976d)
- 6. [一次网站的性能优化之路 -- 天下武功，唯快不破](http://biaochenxuying.cn/articleDetail?article_id=5c8ca2d3b87b8a04f1860c9a)



# 10. 最后


鉴于问问题的人有点多，笔者时间有限，处理不过来，大家可以加入 QQ 群：**186045338**，加群暗号：**全栈修炼** ，一起相互交流学习。

如果您觉得本项目和文章不错或者对你有所帮助，请给个星呗，你的肯定就是我继续创作的最大动力。

欢迎关注公众号，并回复 **福利** 可领取免费学习资料，福利详情请猛戳：  [免费资源获取--Python、Java、Linux、Go、node、vue、react、javaScript](https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&mid=2247483711&idx=1&sn=1ffb576159805e92fc57f5f1120fce3a&chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&token=1560489745&lang=zh_CN#rd)

![BiaoChenXuYing](https://upload-images.jianshu.io/upload_images/12890819-1921c40c1e9c39ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


