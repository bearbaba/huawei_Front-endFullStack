# Vue 基础

## Vue 介绍

Vue 是一种渐进式的 JavaScript 框架，它采用的是 MVVM 模式。

Vue 的优点在于它的编码模式简洁，体积小，运行效率高，适合移动端和PC端的开发，它只关注于 UI ，可以轻松引入 Vue 插件或第三方库开发项目。

Vue 借鉴了 Angular 框架的模块和数据绑定，借鉴了 React 的组件化和虚拟 DOM 技术。

## Vue 基本使用

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    <input type="text" v-model="userName"/>
    <p>{{ message }} {{ userName }}</p>
  </div>
  <script>
    var app = new Vue({
      el: "#app",
      data: {
        message: "hello world",
        userName: null
      }
    })
  </script>
</body>
</html>
```

这是一个在 HTML 中使用 Vue 的一个例子，可以看到首先需要引入 Vue.js ，这个将 JS 版本的文件下载下来引入使用，也可以使用 Vue 官网提供的链接引入使用。

以上的例子是一个声明式渲染与表单数据双向绑定的例子。

### Vue 实例与数据绑定

通过构造 Vue 就可以创建一个 Vue 的根实例，并启动 Vue 应用：

```javascript
var app = new Vue({
    //选项
})
```

变量`app`就代表 Vue 实例。
必不可少的一个选项是`el`，`el`用于指定一个页面中已存在的DOM元素来挂载实例，它可以是HTML标签，也可以是css选择器，比如：  

```html
<div id="app"></div>
var app = new Vue({
    el:document.getElementById('app');//或者直接写"#app"
})
```

挂载后我们可以通过`app.$el`来访问该元素，通过 Vue 实例中的`data`选项，可以声明应用内需要双向绑定的数据。

```javascript
var app = new Vue({
    el:'#app';
    data:{
        a:2;
    }
})
```

Vue 实例本身代理了`data`对象里的所有属性，所以可以这样访问：`console.log(app.a);//2`，`app.a`访问了`a`属性。  

可以指向一个已有的变量，并且它们之间默认建立了双向绑定，修改其中一个，另一个也会被修改。

```javascript
var myData={
    a:1
}
var app = new Vue({
    el:"#app",
    data:myData,
})
app.a=2;

//修改属性，原数据也会随之修改
console.log(myData.a);//2

//修改原数据，Vue属性也会被修改
myData.a=3;
console.log(app.a);//3

```

### Vue插值操作

在Vue中使用`{{}}`来进行插值，在双大括号内可以对数据进行简单操作，如字符串拼接：

```html
<div id="app">
    <div>{{firstname+lastname}}</div>
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            firstname: "Hello",
            lastname: "World!",
        }
    })
</script>
```

还可以在双花括号内对变量进行四则运算：

```javascript
<div id="app">
    <div>{{number*10*3.1415926}}</div>
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            number: 512,
        }
    })
</script>
```

## v-text / v-html

插值语法使用双大括号可以将变量的值表示显示出来，`v-html`能将 Vue 对象内的`data`的内容转换为 HTML 标签内容，而`v-text`能将内容转换为文本内容。

```html
<div id="app">
<p v-html="htmlContent"/>
</div>
<script>
const vm = new Vue({
    el: "#app",
    data:{
    htmlContent: "<a href='www.baidu.com'>baidu</a>",
    }
})
</script>
```

## v-bind 指令

`v-bind`动态绑定 HTML 中的属性：

```html
<div id="app">
    <a v-bind:href="aHref">百度一下</a>
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            aHref: "http://www.baidu.com",
        }
    })
</script>
```

上例中`<a>`标签内的`href`属性被绑定了`v-bind`，`href`的值可以根据 Vue 中的`data`动态改变。

语法糖：`v-bind`可以简写成`:`，添加到要绑定的属性前。

### v-bind绑定class并使用对象语法

`v-bind`可以绑定class后使用对象语法来控制`class`的值，例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/vue.js"></script>
    <style>
        .bgC {
            border: 1px solid black;
            width: 100px;
            height: 100px;
        }

        #button {
            display: flex;
            width: 100px;
        }

        #green {
            margin-left: auto;
        }

        .isRed {
            background-color: red;
        }

        .isGreen {
            background-color: green;
        }
    </style>
</head>

<body>
    <div id="app">
        <div class="bgC" :class="{isRed:isRedValue,isGreen:isGreenValue}">改变背景色</div>
        <div id="button">
            <button v-on:click="changeColorRed">红色</button>
            <button id="green" v-on:click="changeColorGreen">绿色</button>
        </div>
    </div>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                aHref: "http://www.baidu.com",
                isRedValue: false,
                isGreenValue: false,
            },
            methods: {
                changeColorGreen: function() {
                    this.isGreenValue = !this.isGreenValue;
                },
                changeColorRed: function() {
                    this.isRedValue = !this.isRedValue;
                }
            }
        })
    </script>
</body>

</html>
```

以上案例通过点击按钮能够切换`id`为`#bgC`的背景色。关键在于`<div class="bgC" :class="{isRed:isRedValue,isGreen:isGreenValue}">改变背景色</div>`这句中，将class除`.bgC`外又绑定了`isRed`与`isGreen`，这两个`value`值初始状态下为`false`，在点击相应按钮后，可以使它们的value值为true。
除动态绑定的`class`外，还可以设置一个不绑定`v-bind`的`class`值，它们并不会冲突。

### v-bind 动态绑定 class 数组语法

也可以使用数组语法动态绑定`class`，例：

```html
<div id="yel">
    <div :class="[bgSize,color]"></div>
</div>
<style>
    .bgSize {
        width: 100px;
        height: 100px;
    }

    .color {
        background-color: yellow;
    }
</style>
<script>
    var vm1 = new Vue({
        el: "#yel",
        data: {
            bgSize: "bgSize",
            color: "color"
        }
    })
</script>
```

以上例子通过数组的方式将`bgSize`与`color`class样式动态传递给div标签，使div拥有了动态的class样式。

### v-bind动态绑定style属性

与动态绑定class类似也有对象写法，例：

```html
<div :style={属性名:属性值}><div>
```

在绑定中的HTML标签内写上绑定css样式的对象写法，其中对象名实际是css中的属性名，如对象名可以用`fontSize`，`fontSize`实际是css中的`font-size`的驼峰写法。对象的`value`可以直接明确标出css中的样式对应的属性值，或者使用变量名的方式，在构造的vue内的`data`中再写出变量对应的属性值，例：

```html
<div id="fontCont">
    <div :style="{fontSize:finalFont}">Hello World！</div>
</div>
<script>
    var vm2 = new Vue({
        el: "#fontCont",
        data: {
            finalFont: "50px",
        }
    })
</script>
```

还可以用字符串拼接的方式，将传递的int值拼接成字符串，例：

```html
<div id="app1">
    <div :style="{fontSize:finalSize+'px'}">
        Hello World!
    </div>
</div>
<script>
    var vm3 = new Vue({
        el: "#app1",
        data: {
            finalSize: 100,
        }
    })
</script>
```

可以将要绑定的css对象在data中声明后用对象名的方式来动态绑定style，例：

```html
<div id="app1">
    <div :style="fontC">
        Hello World!
    </div>
</div>
<script>
    var vm3 = new Vue({
        el: "#app1",
        data: {
            finalSize: 100,
            fontC: {
                fontSize: "100px",
                color: "red"
            }
        }
    })
</script>
```

也可以将对象封装到方法中，然后以方法名的方式绑定到style上，例：

```html
<div id="app3">
    <div :style="getFontSize()">{{text}}</div>
</div>
<script>
    var vm4 = new Vue({
        el: "#app3",
        data: {
            text: "你好，世界！",
            finalSize: '100px',
            fontColor: 'red'
        },
        methods: {
            getFontSize: function() {
                return {
                    fontSize: this.finalSize,
                    color: this.fontColor
                };
            }
        }
    })
</script>
```

### 数组方式动态绑定style

将总的css样式写成对象后，再将对象放置在数组中绑定到style上，例：

```html
<div id="app4">
    <div :style="[baseStyle]">{{message}}</div>
</div>
<script>
    vm5 = new Vue({
        el: "#app4",
        data: {
            message: "hello World!",
            baseStyle: {
                fontSize: '50px',
                color: 'blue'
            }
        }
    })
</script>
```