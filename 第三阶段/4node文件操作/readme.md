# node文件操作

在`node`中可以通过`fs`模块来对文件进行操作，`fs`是`node`的核心模块，所以无需加载，但是需要通过`require()`进行引入；

```js
const fs = require("fs");
```

`fs`文件系统对文件的操作方法大部分都是分同步与异步的，同步方法会阻塞程序，而异步方法则不会。

## 同步文件读写

同步文件读写首先需要使用`fs.openSync(path, flags, mode);`。`path`是该文件名称及其路径。`flags`参数则决定了该方法是对文件的读还是写，如果是“读”操作，则设置为`r`；如果是“写”操作，则设置为`w`。`mode`则是操作文件的权限设置，一般不写。

如果需要将字符串写入文件内，则需要用上`fs.writeFileSync(fd, string [,position, encoding])`。`fd`是指使用`fs.openSync()`生成的文件对象。`string`则是字符串内容。`position`表示起始位置，设置为2时，就会让文件内容前添加两个空格。`encoding`则是文件的编码方式，默认为`utf-8`。

在文件的“写”操作完成后需要将文件对象关闭，否则文件对象会一直占用内存，使用`fs.closeSync(fd)`关闭指定的`fd`文件对象。

```js
var fs = require("fs")

var fd = fs.openSync("a.txt", "w")

fs.writeFileSync(fd, "你好")
fs.closeSync(fd)

```

