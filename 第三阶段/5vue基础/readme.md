# Vue 基础

## Vue 介绍

Vue 是一种渐进式的 JavaScript 框架，它采用的是 MVVM 模式。

Vue 的优点在于它的编码模式简洁，体积小，运行效率高，适合移动端和 PC 端的开发，它只关注于 UI ，可以轻松引入 Vue 插件或第三方库开发项目。

Vue 借鉴了 Angular 框架的模块和数据绑定，借鉴了 React 的组件化和虚拟 DOM 技术。

## Vue 基本使用

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <input type="text" v-model="userName" />
        <p>{{ message }} {{ userName }}</p>
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                message: "hello world",
                userName: null,
            },
        });
    </script>
</body>

</html>
```

这是一个在 HTML 中使用 Vue 的一个例子，可以看到首先需要引入 Vue.js ，这个将 JS 版本的文件下载下来引入使用，也可以使用 Vue 官网提供的链接引入使用。

以上的例子是一个声明式渲染与表单数据双向绑定的例子。

### Vue 实例与数据绑定

通过构造 Vue 就可以创建一个 Vue 的根实例，并启动 Vue 应用：

``` javascript
var app = new Vue({
    //选项
});
```

变量 `app` 就代表 Vue 实例。
必不可少的一个选项是 `el` ， `el` 用于指定一个页面中已存在的 DOM 元素来挂载实例，它可以是 HTML 标签，也可以是 css 选择器，比如：

``` html
<div id="app"></div>
var app = new Vue({ el:document.getElementById('app');//或者直接写"#app" })
```

挂载后我们可以通过 `app.$el` 来访问该元素，通过 Vue 实例中的 `data` 选项，可以声明应用内需要双向绑定的数据。

``` javascript
var app = new Vue({
    el: '#app';
    data: {
        a: 2;
    }
})
```

Vue 实例本身代理了 `data` 对象里的所有属性，所以可以这样访问： `console.log(app.a);//2` ， `app.a` 访问了
`a` 属性。

可以指向一个已有的变量，并且它们之间默认建立了双向绑定，修改其中一个，另一个也会被修改。

``` javascript
var myData = {
    a: 1,
};
var app = new Vue({
    el: "#app",
    data: myData,
});
app.a = 2;

//修改属性，原数据也会随之修改
console.log(myData.a); //2

//修改原数据，Vue属性也会被修改
myData.a = 3;
console.log(app.a); //3
```

### Vue 插值操作

在 Vue 中使用 `{{}}` 来进行插值，在双大括号内可以对数据进行简单操作，如字符串拼接：

``` html
<div id="app">
    <div>{{firstname+lastname}}</div>
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            firstname: "Hello",
            lastname: "World!",
        },
    });
</script>
```

还可以在双花括号内对变量进行四则运算：

``` javascript
< div id = "app" >
    <
    div > {
        {
            number * 10 * 3.1415926
        }
    } < /div> < /
div > <
    script >
    var vm = new Vue({
            el: "#app",
            data: {
                number: 512,
            }
        }) <
        /script>
```

## v-text / v-html

插值语法使用双大括号可以将变量的值表示显示出来， `v-html` 能将 Vue 对象内的 `data` 的内容转换为 HTML 标签内容，
而 `v-text` 能将内容转换为文本内容。

``` html
<div id="app">
    <p v-html="htmlContent" />
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            htmlContent: "<a href='www.baidu.com'>baidu</a>",
        },
    });
</script>
```

## v-bind 指令

`v-bind` 动态绑定 HTML 中的属性：

``` html
<div id="app">
    <a v-bind:href="aHref">百度一下</a>
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            aHref: "http://www.baidu.com",
        },
    });
</script>
```

上例中 `<a>` 标签内的 `href` 属性被绑定了 `v-bind` ， `href` 的值可以根据 Vue 中的 `data` 动态改变。

语法糖： `v-bind` 可以简写成 `:` ，添加到要绑定的属性前。

### v-bind 绑定 class 并使用对象语法

`v-bind` 可以绑定 class 后使用对象语法来控制 `class` 的值，例：

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        < div class="bgC" : class="{isRed:isRedValue,isGreen:isGreenValue}">
            改变背景色 < /div>
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
                },
            },
        });
    </script>
</body>

</html>
```

以上案例通过点击按钮能够切换 `id` 为 `#bgC` 的背景色。关键在于

``` js
< div class = "bgC": class = "{isRed:isRedValue,isGreen:isGreenValue}" >
    改变背景色 <
    /div>
```

这句中，将 `class` 除 `.bgC` 外又绑定了 `isRed` 与 `isGreen` ，这两个 `value` 值初始状态下为 `false` ，
在点击相应按钮后，可以使它们的 `value` 值为 `true` 。

除动态绑定的 `class` 外，还可以设置一个不绑定 `v-bind` 的 `class` 值，它们并不会冲突。

### v-bind 动态绑定 class 数组语法

也可以使用数组语法动态绑定 `class` ，例：

``` html
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
            color: "color",
        },
    });
</script>
```

以上例子通过数组的方式将 `bgSize` 与 `color`  `class` 样式动态传递给 `div` 标签，
使 `div` 拥有了动态的 `class` 样式。

### v-bind 动态绑定 style 属性

与动态绑定 class 类似也有对象写法，例：

``` html
<div :style="{属性名:属性值}">
    <div></div>
</div>
```

在绑定中的 HTML 标签内写上绑定 `css` 样式的对象写法，其中对象名实际是 `css` 中的属性名，如对象名可以用 `fontSize` ，
`fontSize` 实际是 css 中的 `font-size` 的驼峰写法。

对象的 `value` 可以直接明确标出 `css` 中的样式对应的属性值，或者使用变量名的方式，在构造的 vue 内的 `data` 中再写出变量对应的属性值，例：

``` html
<div id="fontCont">
    <div :style="{fontSize:finalFont}">Hello World！</div>
</div>
<script>
    var vm2 = new Vue({
        el: "#fontCont",
        data: {
            finalFont: "50px",
        },
    });
</script>
```

还可以用字符串拼接的方式，将传递的 `int` 值拼接成字符串，例：

``` html
<div id="app1">
    <div :style="{fontSize:finalSize+'px'}">Hello World!</div>
</div>
<script>
    var vm3 = new Vue({
        el: "#app1",
        data: {
            finalSize: 100,
        },
    });
</script>
```

可以将要绑定的 css 对象在 `data` 中声明后用对象名的方式来动态绑定 style，例：

``` html
<div id="app1">
    <div :style="fontC">Hello World!</div>
</div>
<script>
    var vm3 = new Vue({
        el: "#app1",
        data: {
            finalSize: 100,
            fontC: {
                fontSize: "100px",
                color: "red",
            },
        },
    });
</script>
```

也可以将对象封装到方法中，然后以方法名的方式绑定到 style 上，例：

``` html
<div id="app3">
    <div :style="getFontSize()">{{text}}</div>
</div>
<script>
    var vm4 = new Vue({
        el: "#app3",
        data: {
            text: "你好，世界！",
            finalSize: "100px",
            fontColor: "red",
        },
        methods: {
            getFontSize: function() {
                return {
                    fontSize: this.finalSize,
                    color: this.fontColor,
                };
            },
        },
    });
</script>
```

### 数组方式动态绑定 style

将总的 css 样式写成对象后，再将对象放置在数组中绑定到 style 上，例：

``` html
<div id="app4">
    <div :style="[baseStyle]">{{message}}</div>
</div>
<script>
    vm5 = new Vue({
        el: "#app4",
        data: {
            message: "hello World!",
            baseStyle: {
                fontSize: "50px",
                color: "blue",
            },
        },
    });
</script>
```

## 计算属性 computed

我们可以使用封装成方法的方式，传值给双大括号内的方法，例：

``` html
<div id="app5">
    <div>{{getFullname()}}</div>
</div>
<script>
    var vm6 = new Vue({
        el: "#app5",
        data: {
            firstName: "Hello",
            lastName: "World!",
        },
        methods: {
            getFullname() {
                return this.firstName + " " + this.lastName;
            },
        },
    });
</script>
```

上例中花括号内的 `getFullname()` 是一个方法，返回值是 data 内的 `firstName` 与 `lastName` 的拼接。

也可以使用计算属性的方式，把值传递给双大括号内的属性。例：

``` html
<div id="app6">
    <div>{{fullName}}</div>
</div>
<script>
    var app6 = new Vue({
        el: "#app6",
        data: {
            firstName: "Hello",
            lastName: "World!",
        },
        computed: {
            fullName: function() {
                return this.firstName + " " + this.lastName;
            },
        },
    });
</script>
```

计算属性不需要像方法那样加上括号，只需要属性名即可。

一个例子，计算属性调用对象：

``` html
<div id="objectUse">
    <div>{{booki}}</div>
</div>
<script>
    const v = new Vue({
        el: "#objectUse",
        data: {
            books: [{
                    id: 1,
                    name: "book1",
                    price: 100,
                },
                {
                    id: 2,
                    name: "book2",
                    price: 120,
                },
                {
                    id: 3,
                    name: "book3",
                    price: 89,
                },
            ],
        },
        computed: {
            booki: function() {
                let book = "";
                for (let i in this.books) {
                    book +=
                        "id: " + this.books[i].id + " book name: " + this.books[i].name;
                }
                return book;
            },
        },
    });
</script>
```

这里的计算属性中的 `function()` 用的是 `for..in..` 写法， `for.. in..` 每次迭代时，从要迭代的对象中取出索引值，

也可以使用 `for..of..` 写法， `for..of..` 每次迭代取出的是迭代对象的值，而不是索引值，例：

``` html
<div id="objectUse">
    <div>total price: {{totalPrice}}</div>
</div>
<script>
    const v = new Vue({
        el: "#objectUse",
        data: {
            books: [{
                    id: 1,
                    name: "book1",
                    price: 100,
                },
                {
                    id: 2,
                    name: "book2",
                    price: 120,
                },
                {
                    id: 3,
                    name: "book3",
                    price: 89,
                },
            ],
        },
        computed: {
            totalPrice: function() {
                let price = 0;
                for (let i of this.books) {
                    price += i.price;
                }
                return price.toString();
            },
        },
    });
</script>
```

### getter 和 setter

计算属性默认只有 `getter` ，不过也可以手动设置。

``` html
<div id="app">
    <input type="text" v-model="firstName" />
    <input type="text" v-model="lastName" />
    <p>fullName: {{fullName}}</p>
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            firstName: null,
            lastName: null,
        },
        computed: {
            fullName: {
                get() {
                    return this.firstName + this.lastName;
                },
                set(newData) {
                    const currentData = newData.split(" ");
                    this.firstName = currentData[0];
                    this.lastName = currentData[1];
                },
            },
        },
    });
</script>
```

上例中，当我们在控制台内强制改变 `fullName` 的值时， `set` 才会发生作用，所以实际上 `setter` 使用的次数很少。

## 侦听属性 watch

侦听属性 `watch` 能在监听的对象发生改变时，执行所设定的函数。例：

``` html
<div id="app">
    <input v-model="fullname" type="text" />
    <p>{{fullname}}</p>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            fullname: "firstName lastName",
        },
        watch: {
            fullname(newData, oldData) {
                console.log(oldData);
                console.log(newData);
            },
        },
    });
</script>
```

上述 `watch` 监听的是 `fullname` ，当 `fullname` 发生变化时，执行 `watch` 中为 `fullname` 绑定的方法，该方法有两个参数，旧数据与新数据。

`oldData` 可以不写，只使用 `watch` 的新数据也是可以的。

## 条件渲染

`v-if` 、 `v-else-if` 、 `v-else` 的使用可以使得我们使用的标签在条件符合时才会出现，

``` html
<div id="app">
    <p v-if="num == 0">0</p>
    <p v-else-if="num == 1">1</p>
    <p v-else>2</p>
    <input type="button" value="add" @click=" num += 1" />
    <input type="button" value="sub" @click=" num -= 1" />
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            num: 0,
        },
    });
</script>
```

`v-show` 是另一个用于条件渲染的指令。

``` html
<div id="app">
    <div class="cube" v-show="show">这是一个红色方块</div>
    <input type="button" value="click" @click="show = !show">
</div>
<style>
    .cube {
        background-color: red;
        width: 100px;
        height: 100px;
    }
</style>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            show: true,
        }
    })
</script>
```

`v-show` 与 `v-if` 的区别在于， `v-show` 不论条件是否符合，都会把元素先加载出来，只是不显示， `v-if` 条件为 `false` 是不会加载也不会显示的。

## v-for指令

v-for可以遍历数组与对象，语法格式： `v-for="item in items"` 。
遍历数组时，如果设置了两个参数要从遍历的数组中取出，那么第一个参数是取出的值，第二个参数是索引值。例：

``` html
<div id="app">
    <div v-for="(item,index) in items">{{item}}--{{index}}</div>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            items: [1, 2, 4, 5, 6, 6, 2],
        }
    })
</script>
```

`v-for` 遍历对象时，可以设置三个参数，这三个参数分别对应对象的值，对象名和对象的索引值。例：

``` html
<div id="app">
    <div v-for="(value,key,index) in objects">{{key}}--{{value}}--{{index}}</div>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            objects: {
                color: "red",
                fruits: "vegetable",
                food: "beef",
            }
        }
    })
</script>
```

## v-on事件监听

`v-on` 用于监听事件，例如 `v-on:click=""` 用于指向 `methods` 中的方法。
语法糖：在绑定的事件前加@，例 `@click` ，
使用@click调用 `methods` 中的函数时要注意参数问题。

* 情况一：如果该方法不需要额外参数，那么方法后的()可以不用加，

但是要注意的是，如果方法本事中有一个参数，尽管这个参数并没有明确指定它所要指向的对象，但系统会默认将原生事件event参数传递进去。

* 情况二，如果需要传入某个参数，同时还需要event时，可以通过$event传入事件。例：

``` html
<div id="app">
    <div>{{message}}</div>
    <button @click="addMethod(message,$event)">+</button>+</button>
</div>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            message: 0,
        },
        methods: {
            addMethod(message, $event) {
                this.message++;
                console.log(message);
                console.log($event);
            }
        }
    })
</script>
```

上例中每次调用 `addMethod` 方法时，打印 `message` 值与 `event` 事件对象。

### v-on修饰符的使用

`.stop` 能阻止事件冒泡，所谓事件冒泡就是一个父子元素同时拥有方法时，点击子元素，父元素的方法也会进行。例：

``` html
<div id="app1" @click="clickA('clickA')">
    <button @click="clickB('clickB')">B</button>
</div>
<script>
    const vm1 = new Vue({
        el: "#app1",
        methods: {
            clickA: function(string) {
                console.log(string);
            },
            clickB: function(string) {
                console.log(string)
            }
        }
    })
</script>
```

以上生成了一个B按钮，当B按钮被点击时，控制台会出现“clickA”与“clickB”，说明B被按下时，父元素的方法也会被调用，这就是事件冒泡，
当我们只想要B被按下只出现 `clickB` 方法而不出现父元素方法时，就可以用 `.stop` 修饰符。例：

``` html
<div id="app1" @click="clickA('clickA')">
    <button @click.stop="clickB('clickB')">B<button>
</div>
<script>
    const vm1 = new Vue({
        el: "#app1",
        methods: {
            clickA: function(string) {
                console.log(string);
            },
            clickB: function(string) {
                console.log(string)
            }
        }
    })
</script>
```

显然，v-on的修饰符只需要在v-on所修饰的事件监听后添加就可以使用了。

`.prevent` 阻止默认事件，一些元素本身含有默认时间，比如 `<a>` 被点击时会跳转到设置的链接页面上，添加一个方法后，在 `click` 后
添加 `.prevent` 即可阻止点击后默认跳转的事件。

``` html
<div id="app2">
    <a href="http://www.baidu.com" @click.prevent="printEvent">点击后不跳转</a>
</div>
<script>
    const vm2 = new Vue({
        el: "#app2",
        methods: {
            printEvent: function() {
                console.log("不跳转");
            }
        }
    })
</script>
```

`.{keyCode|keyAlias}` 只当事件是从特定键触发时才能回调，例：

``` html
<div id="app4">
    <input type="text" name="输入框" @keyup.enter="print">
</div>
<script>
    const vm3 = new Vue({
        el: "#app4",
        methods: {
            print: function() {
                console.log("抬起键盘");
            }
        }
    })
</script>
```

上例中 `@keyup` 表示监听键盘抬起的事件， `@keyup.enter` 表示只监听Enter键被抬起的事件。

`.once` 只调用一次，使用 `.once` 修饰的事件监听方法时，方法只能使用一次。

`.native` ，自定义HTML组件的方法一般是监听不到的，只能在使用 `.native` 后才能被监听到。

## v-model双向绑定

我们可以使用 `v-model` 对一个变量进行双向绑定。例如，给 `input` 输入框设置一个 `v-model` 绑定一个变量，通过输入内容的改变，来动态改变变量的值：

``` html
    <div id="app">
        <input type="text" name="input" v-model="message">
        <div>{{message}}</div>
    </div>
    <script>
        const vm = new Vue({
            el: "#app",
            data: {
                message: null,
            }
        })
    </script>
```

进行双向绑定的值，可以通过改变Vue实例data中变量的值进行该改变。

### v-model在radio单选按钮上的使用

在单选按钮radio上使用v-model可以将所选的值绑定到Vue实例的data中。
例，单选性别后，将选中的性别显示在页面上。

### v-model在checkbox元素上的使用

在checkbox上的使用分为两种情况：单个复选框与多个复选框。

#### 单选框

单个复选框的使用范围包含某个协议的同意与否。
例：

``` html
<div id="agreement">
    <label for="check">
        <input type="checkbox" name="" id="check" value="同意" v-model="argee" />
        同意协议
    </label>
</div>
<script>
    const agreement = new Vue({
        el: "#agreement",
        data: {
            argee: false,
        }
    })
</script>
```

以上例子将会出现一个同意协议的复选框，默认情况下复选框没有被选中。

#### 多选框

当 `v-model` 使用在多选框内， `v-model` 所对应的data属性是个数组类型，当选中多选框按钮时， `v-model` 所绑定的属性会被添加到数组中，例：

``` html
    <div id="checkBox">
        <label v-for="value in hobbies"><input type="checkbox" :value="value" v-model="list">
            {{value}}
        </label>
        {{list}}
    </div>
    <script>
        const selectBox = new Vue({
            el: "#checkBox",
            data: {
                hobbies: ["篮球", "足球", "排球", "羽毛球"],
                list: [],
            }
        })
    </script>
```

### v-model在元素 `select` 上的使用

和 `checkbox` 类似， `v-model` 在 `select` 上的使用也分为单选和多选。

#### 单选情况

单选时， `v-model` 绑定的是一个值，当浏览器被刷新时， `v-model` 绑定的那个值依然是默认被选中的。例：

``` html
    <div id="selectBox">
        <select v-model="fruit">
            <option value="apple">苹果</option>
            <option value="banana">香蕉</option>
            <option value="orange">橘子</option>
            <option value="grane">葡萄</option>
        </select>
    </div>
    <script>
        const fruitBox = new Vue({
            el: "#selectBox",
            data: {
                fruit: "banana",
            }
        })
    </script>
```

#### 多选情况

多选情况时，要手动为 `select` 元素添加 `multiple` 属性，与 `checkbox` 相似多选时会动态添加到 `data` 内的数组，例：

``` html
    <div id="multipleBox">
        <select name="" id="" multiple v-model="fruit">
            <option value="apple">苹果</option>
            <option value="banana">香蕉</option>
            <option value="orange">橘子</option>
            <option value="grane">葡萄</option>
        </select>
        <div>{{fruit}}</div>
    </div>
    <script>
        const vm2 = new Vue({
            el: "#multipleBox",
            data: {
                fruit: [],
            }
        })
    </script>
```

### v-model修饰符

#### lazy修饰符

默认情况下， `v-model` 默认是在input事件中同步输入框的数据的， `v-model` 在使用 `lazy` 修饰符后，可以让数据在失去焦点或者回车时才会更新，例：

``` html
    <div id="lazyUsed">
        <input type="text" id="" v-model.lazy="message">
        <div>{{message}}</div>
    </div>
    <script>
        const vm = new Vue({
            el: "#lazyUsed",
            data: {
                message: "",
            }
        })
    </script>
```

#### number修饰符

默认情况下，在输入框中无论我们输入的是字母还是数字，都会被当做字符串类型进行处理。 `number` 修饰符可以将输入内容转换成数字，例：

``` html
    <div id="numberUsed">
        <input type="text" id="" v-model.number="message">
        <div>{{message}}</div>
        <button @click="isNumber">是否为数字</button>
    </div>
    <script>
        const vm1 = new Vue({
            el: "#numberUsed",
            data: {
                message: " ",
            },
            methods: {
                isNumber: function() {
                    console.log(typeof this.message);
                }
            }
        })
    </script>
```

上例中的 `<button>` 动态绑定了 `isNumber` 方法，用于判断输入的字符串是否转换为数字，在控制台中可以看到确实转为了数字。

## 生命周期函数

Vue 含有以下声明周期函数：

1. `beforeCreate` ，实例初始化之后， `this` 指向创建的实例，不能访问到 `data` 、 `computed` 、 `watch` 、 `methods` 上的方法和数据。
2. `created` ，实例创建完成，可访问 `data` 、 `computed` 、 `watch` 、 `methods` 上的方法和数据，未挂载 DOM ，不能访问到 `$el` ， `$ref` 为空数组。
3. `beforeMount` ，在开始挂载前被调用，在 `beforeMount` 之前会找到对应的 `template` ，并编译成 `render` 函数。
4. `mounted` ，实例挂载到 DOM 上，此时可以通过 DOM API 获得 DOM 节点， `$ref` 属性可以访问。
5. `beforeUpdate` ，在响应式数据更新时调用，发生在虚拟 DOM 打补丁之前。
6. `updated` ，虚拟 DOM 重新渲染和打补丁之后调用，组件 DOM 已经更新，可执行依赖于 DOM 的操作。
7. `beforeDestroy` ，实例销毁之前调用，此时实例仍然可用， `this` 仍能获取到实例。
9. `destroyed` ，实例销毁后调用，调用后， Vue 实例指示的所有东西都会解绑定，所有事件监听器会被溢出，所有的子实例也会被销毁。

`mounted` 不会承诺子组件也会被一齐渲染。

生命周期函数也被称为“钩子”函数。

``` html
<! DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="app">

        <p v-show="isShow">Hello World</p>
        <input type="button" value="destory" @click="destory()">

    </div>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                isShow: true
            },
            mounted() {
                this.clock = setInterval(() => {
                    console.log("counter")
                    this.isShow = !this.isShow
                }, 1000)
            },
            methods: {
                destory() {
                    this.$destroy()
                }
            },
            beforeDestroy() {
                clearInterval(this.clock)
            },
        })
    </script>
</body>

</html>
```

定时器如果不使用`clearInterval()`清除的话，它会一直执行，耗费内存，如果我们只使用`$destroy()`，而不用`clearInterval()`并不能清除定时器。

我们选择清除定时器的位置是在整个实例被销毁前，如果选择在`destroyed`时清除定时器也是有效的。

