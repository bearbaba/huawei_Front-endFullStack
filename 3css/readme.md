# CSS极简入门

## CSS初识

CSS的英文全称是Cascading Style Sheets，即层叠样式表。

CSS是一种样式表现语言，主要用于对网页样式的定义，例如布局、颜色、文本的设计，简单来说，HTML定义了网页上所有需要的元素，而CSS则是定义这些元素的样式，例如它能控制元素的形状大小。

### CSS历史

* CSS1.0发布于1996年12月。

* CSS2.0发布于1998年5月，提供了更加强大的功能。

* CSS2.1版本发布于2007年，并于2011年6月正式成为标准，是目前使用最为广泛的版本。

* CSS3.0版本发布于1999年开始制定，2001年完成工作草案，是目前CSS最新的版本。它将CSS3的规范内容分成了一系列的模块，更有利于浏览器厂商的逐步支持。

### CSS在网页中的引用

有四种方式可以在网页文件中使用CSS样式，

#### 内联样式

将CSS样式直接写到HTML元素的`style`属性中，例：

```html
<div style="width: 200px; height: 200px; background-color: #ccc;"></div>
```

![示例图片](./img/1.png)

#### 内部样式

将CSS样式写到`<style>`标签中，例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box{
      width: 200px;
      height: 200px;
      background-color: blue;
    }
  </style>
</head>
<body>
  <div class="box"></div>
</body>
</html>
```

![示例图片](./img/2.png)

#### 引入外部样式

精确通过`<link>`样式引入外部的一个CSS文件，这也是使用最为广泛的一种方式。

```html
<!--3new.html-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./css/3new.css">
</head>
<body>
  <div class="box3"></div>
</body>
</html>
```

```css
/* 3new.css */
.box3{
    width:200px;
    height: 200px;
    background-color: yellow;
}
```

![示例图片](./img/3.png)

#### 导入外部样式

通过`<style>`元素中，使用`@import`导入一个外部的CSS文件，最好别用，一些落后的浏览器不支持。

### CSS基本语法

CSS样式由三部分组成：选择符、属性和值，CSS选择符包括HTML选择符、class选择符、id选择符。

#### HTML选择符

HTML选择符是以HTML标签作为选择符，其作用域为所有符合条件的HTML标签，例：

```css
h1{
  text-align: center;
  color: blue;
}
```

那么所有`h1`标签的样式都会被修改成如上样式（不包含还有其它样式作用`h1`元素的情况）。

#### class选择符

使用HTML标签的`class`属性值作为选择符。定义class选择符时，前面需要加"."标志。

class选择符可以为相同及不同元素定义不同与相同样式。

##### 为相同元素定义不同样式

```css
.warning{
  font-size:20px;
}
.danger{
  font-size:30px;
}
```

```html
<!--HTMLbody代码-->
<p class="warning">这是warning样式</p>
<p class="danger">这是danger样式</p>
```

