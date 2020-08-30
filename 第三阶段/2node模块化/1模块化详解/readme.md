# node.js 中的模块化

## 引用外部模块

ECMAScript 存在三个缺点：

1. 没有模块化系统
2. 标准库较少
3. 缺乏管理系统

CommonJS 是 Node.js 中解决模块化问题的方案。CommonJS 对模块引用十分简单，它通过`require()`函数来引用外部模块。

对 JS 而言，一个 JS 文件就是一个模块。

在一个模块内部使用`require()`函数就能根据`require()`中的模块路径自动去引入外部模块，如果使用的路径是相对路径，那么这个路径开头必须使用`.`或者`..`。

例：

```js
//a.js
console.log("hello")
```

```js
//b.js去引入外部的 a 模块
require("./a.js");
```

使用`node`去执行`b.js`得到的结果是`a.js`中的输出。

## 模块导出

`require()`函数引入模块是返回一个对象，这个对象代表引入的模块，但是在 node 中每个 JS 文件实际上都是独立运行的，并非存在于全局作用域内，所以一个模块中的变量和函数在其它模块中无法访问。

如果想要在一个模块内访问导入的模块的变量或者函数时，可以使用`export`来向外部暴露变量和方法。

例:

```js
//c.js
exports.x="hello";
```

```js
//b.js
require("./a.js")
cModule=require("./c.js")
console.log(cModule.x)
```

这个时候便能输出`b.js`文件中导出的`x`变量。

`exports`实际上指向的是`module.exports`的地址，也即是说`exports`的用法可以使用`module.exports`来代替，但是需要注意的是如果想要暴露的是一个由多个值组成的匿名对象，实际上是无法做到的，需要用`module.exports`去完成。例：

```js
//这是无法暴露的
exports={
  name: "hello"
}
```

```js
// This is OK
module.exports={
  name: "hello"
}
```

## node 中变量存储

实际上在 node 中使用`var`初始化的变量时存储在一个函数中，而非存储在这个模块的全局作用域内。

node 中的`global`相当于网页中的`window`对象，它代表着全局作用域，然而在打印`global`后并不能显示模块中使用`var`初始化的变量，这也就证明模块中声明的变量并不存在于模块的全局作用域内。但是如果输出函数的类数组对象，就能显示出这个使用`var`初始化的变量，或者也可以使用`arguments.callee`来输出正在执行的对象，这些都能证明`var`初始化的对象并不存在于当前模块全局作用域内。
