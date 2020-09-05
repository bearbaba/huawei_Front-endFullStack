var fs = require("fs")

var ws = fs.createWriteStream("c.png")

var rs = fs.createReadStream("a.png")

rs.pipe(ws)