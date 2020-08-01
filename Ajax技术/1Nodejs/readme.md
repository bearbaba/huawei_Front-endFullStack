# Node.js

## 了解Node.js

我们可以使用`Node.js`来搭建 web 服务，`Node.js`可以在官网上进行下载安装，安装完后使用`node -v`来查看`Node.js`的版本。

`npm`是`Node.js`的包管理工具，`npm`已经被包含在了`Node.js`中了，可以使用`npm -v`查看`npm`的版本。

## KOA 框架

`koa`是`Node.js`的下一代框架。它的官网为[https://koajs.com]，`koa`框架是比较轻量的一种框架，它使用了中间件技术。

可以使用`npm install koa-generator -g`命令在全局范围内安装`koa`框架的脚手架。

### koa 搭建 web 服务器

在使用`koa2 ajax`命令后可以创建一个名为`ajax`的`koa`项目。

在使用`cd ajax`命令后能进入这个项目的目录，在使用`npm install`命令后能安装`koa`项目的依赖。

使用`npm start`就能运行这个项目，在浏览器中进入`http://localhost:3000`就能看到这个项目运行后的内容。

在项目中含有`views`文件夹，这个文件夹中的内容就是这个项目中的网页内容，项目根目录中的`app.js`就是这个项目的入口。