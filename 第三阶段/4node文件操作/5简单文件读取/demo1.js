var fs = require("fs")

fs.readFile("./a.png", function (err,data){
  if(!err){
    fs.writeFile("b.png", data,function (err){
      if(!err){
        console.log("写入成功")
      }else{
        console.log("写入失败")
      }
    })
  }else{
    console.log("读取错误")
  }
})