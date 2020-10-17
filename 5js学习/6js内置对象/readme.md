# 内置对象

内置对象是指 JS 语言自带的一些对象，这些对象供开发者使用，提供一些常用的或是最基本而必要的功能（属性和方法）。内置对象能够帮助开发者快速进行开发。

## Math 数学对象

Math 数学对象，不是一个构造函数，所以不需要使用`new`来调用，而是直接使用里面的属性和方法即可。例：

```js
console.log(Math.PI); // 输出一个属性，圆周率
```

### Math 最大值方法

Math 最大值使用`Math.max()`方法，使用案例：

```js
console.log(Math.max(1, 2, 99)); // 输出其中最大值99
```

`Math.max()`中如果有无法转换为数字的数据则会输出`NaN`，如果括号中没有数据则会输出`-Infinity`。

### Math 对象的绝对值方法和三个取整方法

#### Math 对象的求绝对值方法

求绝对值方法使用`Math.abs()`，例：

```js
console.log(Math.abs(-1)); //输出1
console.log(Math.abs(-3)); //输出3
```

#### Math 对象的三个取整方法

`Math.round()`方法求的是小数四舍五入的值，例：

```js
console.log(Math.round(3.5)); // 输出4
console.log(Math.round(-3.5)); // 输出-3
```

`Math.floor()`方法求的是向下取整的值，也即如果是正数它会无视小数点后面的值，直接输出整数；如果是负数，它会输出整数位减一后的数，依然无视小数点后的值。例：

```js
console.log(Math.floor(3.2)); // 输出3
console.log(Math.floor(4.7)); // 输出4
console.log(Math.floor(-3.2)); // 输出-4
```

`Math.ceil()`方法与`Math.floor()`相反，它是向上取整，即取的值如果是正数取的是小数整数位置上的数加1后的结果，且无视小数点后的数据；如果是负数取的值是整数位置上的数字，依然无视小数点后的值。例：

```js
console.log(Math.ceil(3.2)); //输出4
console.log(Math.ceil(-3.7)); //输出-4
```

### 随机值方法

`Math.random()`是一个获取随机值的方法，它能返回大于等于0，小于1（也即左闭右开[0, 1)）的一个随机的浮点数，这个方法无需参数。

如果想要获取两个整数之间并包括这两个整数的随机数，我们可以利用`Math.random()`的一个计算公式：

```js
Math.random() * (max - min +1) + min;
```

如果不包括最大值就是`Math.random() * (max - min) + min`。

## Date 日期对象

创建 Date 实例用来处理时间和日期。它是一个构造函数，必须要用上`new`来实例化一个对象。例：

```js
var date = new Date();
```

如果`Date()`括号中没有任何参数，它会返回系统的当前时间。如果有参数，它的参数写法可以是数字型`2019, 10, 1`，或者是字符串型`2019-10-1 08:10:23`。

### 返回当前时间

返回当前日期的年份使用`Date`对象的`getFullYear()`方法，例：

```js
var date = new Date();
console.log(date.getFullYear());
```

返回月份使用`getMonth()`，但是返回当前月份还需要再加1，例：

```js
var date = new Date();
console.log(date.getMonth() + 1);
```

`getDay()`返回当前日期星期几，星期日返回的是0，其余星期几对应相应的数字几。例：

```js
var date = new Date();
console.log(date.getDay());
```

`getHours()`用于返回当前的小时，`getMinutes()`返回当前时间的分，`getSeconds`返回当前时间的秒。

```js
var date = new Date();
console.log(date.getHours());// 时
console.log(date.getMinutes()); // 分
console.log(date.getSeconds()); // 秒
```

### 获取日期总的毫秒数

获取当前时间总的毫秒数使用`Date`对象的`valueOf()`或者`Date`对象的`Date.getTime()`，但是它返回的时间是距离`1970年1月1号`的毫秒数。

```js
var date = new Date();
console.log(data.valueOf());
console.log(data.getTime());
```

除以上方法外，还有`Date.now()`方法。

```js
console.log(Date.now());
```

## 数组对象 Array

我们之前使用数组字面量创建数组，但还可以使用数组对象`Array`创建数组。

```js
var arr = new Array(); // 创建空的数组
var arr1 = new Array(2); // 创建一个长度为2的空数组
var arr2 = new Array(2, 3); // 等价于创建一个值为[2, 3]的数组
```

### 检测是否为数组的两种方式

`instanceof`运算符用来检测是否数组，例：

```js
var arr = [];
console.log(arr instanceof Array); // 输出 true
```

`Array.isArray()`判断传递的数据是否为数组，例：

```js
console.log(Array.isArray([0, 1, 2]));
```

### 数组添加数据的方式

可以通过`push()`方法给一个已存的数组后新增数据，例：

```js
var arr = [1,2];

arr.push("hello", 2);//可以添加多个数据

// arr==[1, 2, "hello", 2]; 原数组发生了变化
```

可以通过`unshift()`方法为一个数组在数组的最前面添加数据，例：

```js
var arr = [1,2];

arr.unshift(3);

// arr==[3, 1, 2]; 原数组也发生了变化
```

### 删除数组中的数据

`pop()`会删除一个数组中最后面的数据，例：

```js
var arr = [1,2,3];
arr.pop();
// arr==[1, 2]
```

`shift()`则删除数组中第一个数据，例：

```js
var arr = [1, 2, 3];
arr.shift();
// arr==[2, 3];
```

### 翻转数组与数组排序

我们要将一个数组中的数据进行翻转，可以使用`reverse()`方法，例：

```js
var arr = [1, 2, 3];
arr.reverse();

// arr== [3,2,1]
```

可以使用`sort()`方法对一个数组进行排序，如果是数字，则按照数字大小升序排序，如果是字母，则按照字母排序顺序进行排序，例：

```js
var arr=[3,1,2];
arr.sort();
// arr==[1,2,3]
```

### 获取数组元素索引

可以使用`indexOf()`返回一个元素在数组中的索引位置，如果找不到该元素则返回-1，这个方法从前向后查找。

`lastIndexOf()`从数组后面往前进行查找。

### 数组转换为字符串

数组转换为字符串可以使用`toString()`方法，或者可以使用`join`()`方法，`join()`方法默认使用逗号进行分隔数组元素，如果使用别的字符串进行分隔可以在括号里使用。

## 基本包装类型

JavaScript 提供了三个特殊的引用类型：Number、 Boolean、 String，它们是基本包装类型。对于简单数据类型是不具有属性和方法的，因为只有对象才具有属性和方法，但是基本包装类型是具有属性和方法的，比如 String 类型可以使用`length`方法获得字符串长度。

### 字符串不可变

字符串是不可变的，这是指它的值是不可变的，虽然我们可以为字符串的变量名重新赋值，但只是改变了变量名指向的内存地址，并非改变原来的字符串值。所以我们每次为字符串的变量名重新赋值时都会新开辟空间，并且原有的值也不会及时回收，这样会造成内存空间上的浪费。

由于字符串的不可变，每次改变字符串的方法会返回新的字符串。

### 根据字符返回位置

`indexOf`可以查找字符在字符串中的位置，如果查找到了，就返回第一次查找到的索引，这个方法有第二个参数，第二个参数控制该方法从指定索引值（查找的位置包含该索引）开始进行查找。如果没有查找到，则返回-1。

```js
var str = 'aabbcc';

console.log(str.indexOf('b')); // 输出2
console.log(str.indexOf('a', 1)); // 输出1
```

### 根据索引返回字符

`charAt(index)`方法可以根据指定的索引`index`返回这个索引位置上的字符。

```js
console.log("aabbcc".charAt(1)); // 输出a
```

`charCodeAt(index)`方法返回相应索引位置上的字符所对应的 ASCII 码。

H5新增了一个方法`str[index]`也可以返回指定索引位置上的字符，例：

```js
var str="aabbcc";
console.log(str[1]); // 输出a
```

### 字符串操作方法

字符串连接方法可以使用`concat(str1, str2, st3...)`方法将两个或多个字符串拼接成一个字符串。例：

```js
var str="color";
console.log(str.concat("red"));// 输出colorred;
```

`substr(start, length)`方法用于截取字符串，从 start 索引号开始截取（包含 start 索引），截取 length 长度的字符。

```js
var str="aabbcc";
console.log(str.substr(0, 3)); // 输出 aab
```

`slice(start, end)`也用于截取字符串，它是从 start 索引位置开始截取，截取到 end （不包括 end 索引），`substring(start, end)`也用于截取字符串，基本用法与`slice`相同，但是不允许接受负值。

### 替换字符与将字符串转换为数组

`replace()`可以将字符串中指定的字符替换为另一个字符，但是它只能替换第一个被查找到的字符。例：

```js
var a="aabbcc";
console.log(a.replace('a','b'));// 输出 babbcc
```

可以使用`split`方法将字符串转换为数组，但它需要指定一个字符用于分割字符串。例：

```js
var a="a b c";
console.log(a.split(" ")); // 输出 ["a", "b", "c"]
```

## 数据类型分配

简单数据类型被称为值类型，复杂类型也被称为引用类型。

简单数据类型包含 number、 string、 boolean、 undefined、 null 等，它包含的是值的本身。

而引用类型包含`Date()`、`Array`、`Object`等，它在存储变量时仅仅存储的是地址，需要通过`new`关键字进行创建。

简单数据类型的值存储在栈中，而复杂数据类型的值存储在堆中，但是复杂数据类型会首先把地址存放在栈里，然后这个地址会指向堆中存放的值。

函数的形参可以看做是一个变量，当我们把简单数据类型的变量通过值传递给形参，只是把这个变量复制了一份给形参，形参与函数外部变量是没有关系的。

而引用类型变量值传递给形参却是将栈中的地址复制了一份给了形参，所以形参与函数外部变量操作的是同一个对象。
