# jQuery 中的 Ajax

## jQuery 介绍

jQuery 是 JavaScript 的一个库，它极大地简化了 JavaScript 编程。

它广泛地使用一种`$`符号。

一些 JS 是对 DOM 元素的操作，然而这些 JS 代码在执行到它时，DOM 还未加载，这个时候就会出现错误，正确的做法是把这个 JS 写到`<body>`标签后，或者在 JS 中使用 `ready`方法等待 DOM 加载完才去执行 DOM 相关的 JS 操作。

```js
alert("hello");

$(document).ready(function(){
  $("#name").html("hello world");
})
```

```pug
extends layout

block content
  block(id="name")
```

## jQuery 中的 get 与 post 方法

`jQuery`中的`get`方法使用时写为`$.get(url, data, callback, type)`，括号中是它的参数，除了`url`其余三个可以省略。这四个参数详解为：

* `url`：请求的地址
* `data`：请求的参数
* `callback`：请求成功时的回调函数
* `type`：请求返回的数据格式

请求参数可以是 JSON，可以是字符串。

返回的数据格式可以是：JSON，HTML，Text等。

`post`方法使用时写为`$.post(url, data, callback, type)`，`post`请求参数放在请求体中，其余用法与`get`方法大致相同。

### 案例

```js
$(function){
  $("#name").html("classroom");
  $.get("/ajax", function(){
    console.log(variable);
  },"script")
}
```

需要修改`koa`中`app.js`的内容，这样`get`请求成功时才能打印出`variable`（`app.js`是服务器的内容，我们需要使用`get`方法访问服务器，并得到相应数据，这里是一个模拟）。

`koa`中的`app.js`增加下述内容：

```js
app.use(async function(ctx){
  if(ctx.path=="/ajax"){
    ctx.body="var variable='hello world'";
  }
})
```

## jQuery 中的 ajax 方法

`jQuery`的`ajax`方法是`post`和`get`方法底层方法。它使用的格式为`$.ajax(option)`，`option`是`JSON`格式的配置参数，用于设置`ajax`的请求。

常用配置有：

* `url`：发送请求的地址，
* `type`：请求方式（`get`和`post`)，
* `data`：请求参数，
* `dataType`：返回的数据类型（`JSON`、`html`、`xml`）。

* `success`：请求成功后的回调函数，
* `error`：请求失败后的回调函数，
* `complete`：请求不论成功或者失败后返回的函数

布尔类型的请求：

* `async`：是否为异步，
* `cache`：进行缓存，
* `timeout`：请求超时时间（毫秒）

### 案例

（对上节`get`方法的内容使用`ajax`方法重写）

```js
$.ajax({
  url: '/ajax',
  dataType: 'script',
  success: function(){
    console.log(variable);
  }
})
```