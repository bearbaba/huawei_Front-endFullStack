var fs = require("fs")

var fd = fs.openSync("a.txt", "w")

fs.writeFileSync(fd, "你好")
fs.closeSync(fd)

