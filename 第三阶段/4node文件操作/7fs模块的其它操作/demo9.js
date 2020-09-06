var fs = require("fs")

fs.watchFile("c.txt", {interval: 1000}, function(curr, prev){
  console.log(curr.size)
  console.log(prev.size)
})