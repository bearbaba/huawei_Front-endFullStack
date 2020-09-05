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
