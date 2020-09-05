var fs = require("fs")

fs.open("./abc.txt", "w", function(err, fd){
  if(!err){
    console.log("fd");
    fs.write(fd, "hello",function(err){
      if(!err){
        fs.close(fd,function(err){
          if(err){
            console.log(err);
          }else {
            console.log("OK");
          }
        });
      }
      else{
        console.log(err);
      }
    });

  }else{
    console.log(err);
  }
})
