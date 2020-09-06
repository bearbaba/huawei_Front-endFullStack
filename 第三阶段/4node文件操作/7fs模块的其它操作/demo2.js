var fs = require("fs")

fs.stat("a.txt", function (err,stats){
  console.log(stats.isFile())
  console.log(stats.isDirectory())
  console.log(stats.size)
})