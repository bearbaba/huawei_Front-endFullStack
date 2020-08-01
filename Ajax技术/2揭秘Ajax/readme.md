# 揭秘 AJAX

## 同步与异步

同步（ synchronous ，简称 sync ），对于同步任务，计算机会等待一个同步任务完成后才会处理下一个任务。

异步 （ asynchronous ， 简称 async ），如果处理请求时需要时间，对于 async 它不会去等待，去处理其它任务，等到时间到了就会去处理异步。

## XMLHttpReqest

`XMLHttpRequest`简称`XHR`，以下几个方法比较常用：

* `open`方法，初始化请求参数，
* `send`发送请求，
* `setRequestHeader`方法，

它还包含以下几个属性比较常用：

* `onreadystatechange`；`readyState`参数改变时就会触发它
* `readyState`，它是 ajax 对象发送时的状态
* `status`：请求的状态码
* `responseText`它是请求返回的结果

对于`XMLHttpRequest`的使用，分为四步：

* 创建`XMLRequest`
* 使用`open`
* 使用`send`
* 使用`onreadystatechange`，接受返回的数据

例如：

```js
var xhr = new XMLHttpRequest();
xhr.open("get","http://.....", true); //该方法第一个参数表明它是`get`方法，第二个参数是服务器地址，第三个参数为`true`时表示它是异步的，为`false`时表示它是同步的。

xhr.send(param); //param在`post`方法时使用，`get`时为空

xhr.onreadystatechange = function(){
  xxxxxx
}
```

## 跨域策略

它涉及到浏览器的同源策略，同源策略是指平常使用的网址是由“协议名+主机名+端口号”组成的。端口号默认是80端口，可以不写。如果协议名、主机名、端口号三者之一不同就会出现错误，这就是一个跨域的请求，浏览器会拦截这个跨域的请求。

Ajax 的请求要进行跨域就需要采用跨域的策略，例如`JSONP`方法，它包含了`script`标签中的`img`标签和`link`标签。