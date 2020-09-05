var fs = require("fs")

fs.readFile("a.txt", function (err, data){
  if(!err){
    console.log(data.toString())
  }else{
    console.log("读取时出错了")
  }
})