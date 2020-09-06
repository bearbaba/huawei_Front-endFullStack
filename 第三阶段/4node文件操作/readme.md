# node文件操作

在`node`中可以通过`fs`模块来对文件进行操作，`fs`是`node`的核心模块，所以无需加载，但是需要通过`require()`进行引入；

```js
const fs = require("fs");
```

`fs`文件系统对文件的操作方法大部分都是分同步与异步的，同步方法会阻塞程序，而异步方法则不会。

## 同步文件写入

同步文件写入首先需要使用`fs.openSync(path, flags, mode);`。`path`是该文件名称及其路径。`flags`参数则决定了该方法是对文件的读还是写，如果是“读”操作，则设置为`r`；如果是“写”操作，则设置为`w`。`mode`则是操作文件的权限设置，一般不写。

如果需要将字符串写入文件内，则需要用上`fs.writeFileSync(fd, string [,position, encoding])`。`fd`是指使用`fs.openSync()`生成的文件对象。`string`则是字符串内容。`position`表示起始位置，设置为2时，就会让文件内容前添加两个空格。`encoding`则是文件的编码方式，默认为`utf-8`。

在文件的“写”操作完成后需要将文件对象关闭，否则文件对象会一直占用内存，使用`fs.closeSync(fd)`关闭指定的`fd`文件对象。

```js
var fs = require("fs")

var fd = fs.openSync("a.txt", "w")

fs.writeFileSync(fd, "你好")
fs.closeSync(fd)

```

## 异步文件写入

与同步文件写入方法一样，在使用前需要导入`fs`模块：

```js
var fs = require("fs");
```

异步文件读方法为`fs.open(path,flags,callback)`，在用法上与同步方法不同，`path`依然是文件路径，`flags`也依然可以使用`w`或`r`，但由于它是异步的方法，需要在`callback`回调函数中处理文件对象。

异步的`fs.write()`、`fs.close()`对应着同步的`fs.writeSync()`、`fs.closeSync()`，但它们都增加了一个回调函数作为参数。例：

```js
var fs = require("fs");

var fs = require("fs")

fs.open("./abc.txt", "w", function(err, fd){
  if(!err){
    console.log("fd");
    fs.write(fd, "hello",function(err){
      if(!err){
        fs.close(fd,function(err){
          if(err){
            console.log(err);
          }else {
            console.log("OK");
          }
        });
      }
      else{
        console.log(err);
      }
    });

  }else{
    console.log(err);
  }
})
```

如上所示，对于异步`fs.open()`，它的回调函数含有`err`和`fd`两个参数，`fd`对应着文件对象，而`err`则会在这个回调函数发生异步方法调用错误时出现，所以没有出现异步方法调用错误时使用的是`if(!err)`，对文件的写入内容就是在没有异步方法调用错误的情况下进行使用的。

异步的文件写入方法也有可能出现类似的异步错误，所以也会分为无错误和有错误的情况，`fs.close(fd, err)`也是同理。同样在没有出现异步错误时进行下一步的处理，也就是`fs.close(fd, err)`。

虽然异步方法在用法上比同步方法要更加复杂些，不如同步方法直观，但在程序运行时是要比同步方法更加通用的。

## 简单文件写入

上述无论是同步还是异步的文件写入方法在实际开发中使用的并不频繁，使用更多的是简化的同步文件写入方法`fs.writeFileSync()与异步文件写入方法`fs.writeFile()`。

这个简化的异步文件写入方法`fs.writeFile(path, data[, options], callback)`中`path`、`data`、`callback`的含义依然是文件路径、需要写入文件的内容、回调函数。`options`参数是一个键值对，里面包含着`encoding`编码方式，`mode`参数,`flag`读写模式，`flag`默认为`w`。

```js
var fs = require("fs")

fs.writeFile("abc.txt","hello",function (err){
  if(!err){
    console.log("创建成功")
  }else{
    console.log(err)
  }
})
```

以上是一个将内容写入文件的实例，可以看到它并不需要使用类似的`open()`与`close()`方法。

但是写入文件的内容默认是将原有的内容进行覆盖，如果我们希望在原有的文件内容上进行追加，就需要使用将`flag: "w"`修改成`flag: "a"`。例：

```js
var fs = require("fs")

fs.writeFile("abc.txt","hello", {flag:"a"}, function (err){
  if(!err){
    console.log("创建成功")
  }else{
    console.log(err)
  }
})
```

## 流式文件写入

简单文件写入、同步文件写入与异步文件写入都是一次性写入，一次性时所占据内存太大，性能较差，容易导致内存溢出。

流式文件能持续为文件内容进行写入。

流式文件写入方法首先依然需要导入`fs`模块，然后需要使用`fs.createWriteStream(path[, options])`方法创建一个可写文件流，写入文件内容时需要使用这个可写流的`write`方法。例：

```js
var fs = require("fs")

var ws = fs.createWriteStream("abc.txt")

ws.write("hello world")
```

上述的`ws.write()`方法在使用关闭文件流的方法之前可以多次使用以持续为文件写入内容。

文件流的打开与关闭的监测可以通过`ws.on()`方法来监听流的`open`与`close`事件来完成。例：

```js
ws.on("open", function () {
  console.log("文件流已打开");
});

ws.on("close", function () {
  console.log("文件流已关闭");
});
```

但是这个`ws.on()`方法的缺点在于它也是持续使用的，在它开始对文件流进行监听后，只要文件流出现了相应事件，就会调用它的回调函数，即使我们在关闭文件流后又重新打开文件流时已不需要它进行监听了，它依然会去调用对应事件的回调函数。

`ws.once()`在功能与`ws.on()`类似，但不同的是`ws.once()`方法是一次性的，在所监听的事件出现后就会失效。

如果我们需要关闭一个文件流，使用的方法不再是`ws.close()`，而是`ws.end()`方法。

```js
var fs = require("fs")

var ws = fs.createWriteStream("abc.txt")

/* ws.on("open", function () {
  console.log("文件流已打开");
});

ws.on("close", function () {
  console.log("文件流已关闭");
}); */

ws.once("open", function(){
  console.log("文件流已打开")
})

ws.once("close", function(){
  console.log("文件流已关闭")
})

ws.write("hello world")

ws.write("\n hello world")

ws.write("\n w")

ws.end()
```

## 简单文件读取

文件写入方法有同步方法、异步方法、简单写入方法和流式写入方法，同样的，文件读取方法也有同步、异步、简单读取和流式读取方法。

简单读取方法使用`readFile(path[, options], callback)`方法，`callback`回调函数含有两个参数`err`和`data`，`err`在异步调用错误时出现，而`data`则是文件的内容，需要注意这个`data`的类型是`Buffer`类型的，如果要读取的是文本文件的内容，就需要使用`toString()`方法将它转换为字符串。

```js
var fs = require("fs")

fs.readFile("a.txt", function (err, data){
  if(!err){
    console.log(data.toString())
  }else{
    console.log("读取时出错了")
  }
})
```

由于`data`是`Buffer`类型的，意味着我们实际上可以读取任意一种类型的文件，而不仅限于文本文件。例，读取图片文件“a.png”，并重新保存为“b.png”。

```js
var fs = require("fs")

fs.readFile("./a.png", function (err,data){
  if(!err){
    fs.writeFile("b.png", data,function (err){
      if(!err){
        console.log("写入成功")
      }else{
        console.log("写入失败")
      }
    })
  }else{
    console.log("读取错误")
  }
})
```

## 流式文件读写

简单文件读取是一次性的读取，它会占用大量内存，而流式文件读取则适用于大文件的读取。

使用它时需要创建一个可读流。

```js
var fs = require("fs")

var rs = fs.createReadStream("a.png")
```

可读流的读取需要为它绑定一个`data`事件，当`data`事件绑定完毕时，会自动读取数据。

```js
var fs = require("fs")

var rs = fs.createReadStream("a.png")

var ws = fs.createWriteStream("b.png")

rs.once("open", function (){
  console.log("可读流打开")
})

rs.once("close", function(){
  ws.end()
  console.log("可读流关闭")
})

ws.once("open", function () {
  console.log("可写流打开");
});

ws.once("close", function () {
  console.log("可写流关闭");
});

rs.on("data", function (data){
  console.log(data)
  ws.write(data)
})
```

以上是对一个文件的读取并且最终保存为`b.png`，可以看到可读流并不需要手动关闭，它自己就会关闭，而可写流则需要在文件可读流关闭前手动关闭，这样的过程是略有些复杂的。

`fs.pipe(ws)`，可以将可读流的内容输出到可写流中。

```js
var fs = require("fs")

var ws = fs.createWriteStream("c.png")

var rs = fs.createReadStream("a.png")

rs.pipe(ws)
```

## fs 模块的其它操作

### 验证路径是否存在

`fs.existsSync(path)`是用于验证文件路径是否存在的同步方法，用法例：

```js
var fs = require("fs")

var isExists=fs.existsSync("a.c")

console.log(isExists)
```

此处输出为`false`。

它存在异步方法`fs.exists(path, callback)`，但这个方法已被废弃。

需要注意的是只是在对性能上有要求时我们才会使用异步方法。

### 返回当前文件状态信息

可以使用`fs.stat(path, callback)`这个异步方法中的回调函数返回一个对象，对象中保存着当前文件的状态信息。例：

```js
var fs = require("fs")

fs.stat("a.txt", function (err,stats){
  console.log(stats.isFile())
  console.log(stats.isDirectory())
  console.log(stats.size)
})
```

以上的`stats.isFile()`用于验证对象是否为文件，`stats.isDirectory()`用于验证对象是否为文件夹，`stas.size`显示该文件的大小占多少字节。其实还有其它属性和方法，这里不再赘述。

### 删除文件

可以使用`fs.unlinkSync(path)`和`fs.unlink(path, callback)`删除文件，

```js
var fs = require("fs")
fs.unlinkSync("a.txt")
```

### 列出文件

列出文件的方法使用`fs.readdir(path[, options], callback)`和`fs.readdirSync(path[, options])`，

```js
var fs = require("fs")

var dirName = fs.readdirSync(".")

console.log(dirName)
```

### 截断文件

截断文件是指将文件中内容使用字节数进行截取，截断文件的方法可以用`fs.truncate(path, len, callback)`和`fs.truncateSync(path, len)`，`len`是需要进行截断的字节数，可以将文件重新修改为指定大小。

```js
var fs = require("fs")

fs.truncateSync("a.txt", 4)
```

需要注意的是文件一般使用的是`utf-8`编码方式，中文一个汉字占三个字节在`utf-8`编码中。

### 新建文件夹

新建文件夹使用的是`fs.mkdir(path[, mode], callback)`和`fs.mkdirSync(path)`，它可以在指定路径中创建文件夹。

``` js
var fs = require("fs")

fs.mkdirSync("abc")
```

### 删除文件夹

删除文件夹使用的是`fs.rmdir(path, callback)`和`fs.rmdirSync(path)`方法，也只能删除文件夹。

```js
var fs = require("fs")

fs.rmdirSync("a")
```

### 重命名文件和目录

重命名文件和目录使用的是`fs.rename(oldPath, newPath, callback)`，或者同步的`fs.renameSync(oldPath, newPath)`，`newpath`指的是这个文件或者文件夹的新路径，`oldPath`显然是旧路径了，这个方法能做到一种剪切、粘贴的效果。

```js
var fs = require("fs")

fs.renameSync("b.txt", "c.txt")
```

### 监听文件

`fs.watchFileSync(filename[, option], listener)`能够监听文件是否被修改，`listener`是这个方法的回调函数，这个回调函数有两个参数`curr`和`prew`，`curr`指的是当前文件的状态，`prew`指的是修改前的状态。

但是这个方法的反馈时间默认是比较慢的，可以修改`options`来实现更快的反馈。例：

```js
var fs = require("fs")

fs.watchFile("c.txt", {interval: 1000}, function(curr, prev){
  console.log(curr.size)
  console.log(prev.size)
})
```
