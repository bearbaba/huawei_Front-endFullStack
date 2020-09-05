var fs = require("fs")

fs.writeFile("abc.txt","hello",{flag:"a"},function (err){
  if(!err){
    console.log("创建成功")
  }else{
    console.log(err)
  }
})