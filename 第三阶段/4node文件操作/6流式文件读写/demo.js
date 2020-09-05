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

