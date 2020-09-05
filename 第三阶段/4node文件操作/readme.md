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

文件写入方法有同步方法、异步方法、简单读取方法和流式读取方法
