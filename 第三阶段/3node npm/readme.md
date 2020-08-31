# node npm

## 包简介

包实际上相当于一个压缩文件，解压后会还原成目录，符合规范的包目录含：

1. package.json 描述性文件
2. bin\ 文件夹，文件夹中包含的是可执行的二进制文件
3. lib\ 文件夹，包含 JS 代码
4. doc\ 文档文件夹
5. test\ 单元测试文件夹

除了`package.json`外，其余文件都不是非必需文件。

`package.json`用于表达这个包内的各种相关信息。

`package.json`中可以包含的字段：

![示例图片](./1.png)

其中部分项的含义为：

* main：主文件
* dependencies: 项目环境依赖项
* description：描述文件
* devDependencies: 开发环境依赖
* scripts：运行脚本
* version: 版本
* bugs：bug提交的地址

## npm

`npm`是 Node Package Manager 的缩写，`npm`帮助完成了第三方模块的发布、安装和依赖。

`npm`常用的相关命令：

* npm -v：输出版本；
* npm version：输出详细的版本信息；
* npm search 包名：搜索指定包名；
* npm install 包名：安装指定包名的包；
* npm remove / r 包名：删除指定包名的包；
* npm install 包名 --save：安装并添加进依赖中；
* npm install 包名 -g：全局安装，一般是工具；
* npm init：项目的初始化，会在项目目录内生成一个`package.json`。

> 一般项目的所依赖的模块即`node_modules`目录下的模块都不会上传到代码托管平台上，因为一般这些依赖项会不断更新，上传显得并没有那么必要，那么一般会将模块作为依赖项进行安装，那么`package.json`文件中就会有相关记录，在从托管平台上下载下来的项目就可以使用`npm install`命令安装需要依赖的模块。

## node 搜索包的流程

通过`npm`下载的包都在`node_modules`中，`npm`下载的包直接通过包名引入即可。

`node`在使用模块名引入模块时，会首先在当前目录下的`node_modules`中查找，如果没有查找到就会去上一级中的`node_modules`中查找，如果依然没有，会一直到更上一级进行查找，直到找到为止，如果在磁盘根目录内仍然没有查找到，就会报错。

## Buffer

`Buffer`的结构和数组很像，它的出现是为了弥补数组的不足，它的操作方法也类似于数组，数组不能存储二进制文件，而`Buffer`就是为了存储二进制文件而诞生的，它能直接操纵内存。

```js
var str = "Hello world"
var buf = Buffer.from(str)
```

以上内容是将字符串`str`变量通过`Buffer.from()`方法将其转换成了二进制数据。

虽然变量的存储是二进制数据，但是在计算机中会显示为十六进制数据。

需要注意的是对`Buffer`类型数据使用`length`得到的是变量占用内存的大小，`Buffer`中的1个元素占用1个字节内存大小，而1个汉字则占用3个字节大小。

`Buffer`的构造函数已过期，即不能使用`var buf = Buffer()`创建`Buffer`类型对象。

可以使用`Buffer.alloc(size)`创建指定`size`元素大小的变量。指定`size`元素大小的`Buffer`变量一旦确定后就不能修改，即指定的`Buffer`数组变量的索引不可大于`指定`size`大小，另外由于每个元素大小为一个字节，所以对单个索引的值大小不可大于十进制的255，否则数据会丢失。

`Buffer`的`Buffer.allocUnsafe(size)`也可创建一个指定`size`大小的`Buffer`数组变量，甚至它的效率是要高于`Buffer.alloc()`方法的，但是它创建的数组中可能含有敏感数据，因为`alloc`方法创建的数组实际上是要将指定大小的内存先清空后再使用，而`allocUnsafe`方法则不进行清空就进行使用，所以可能含有敏感数据。
