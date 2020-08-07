var btn = document.getElementById("btn");
var account = " ";
var pwd = " ";
btn.onclick = function(){
  account = document.getElementById("account").value;
  pwd = document.getElementById("pwd").value;
  ajax({
    type: "post",
    url: "/jq",
    data:{
      account: account,
      pwd: pwd
    }
  });
}

function ajax(opt){
  var defaultParam = {
    type: "get",
    url:"#",
    data:{},
    async: true,
    success: function(){

    }
  }

  for(var key in opt){
    defaultParam[key]=opt[key];
  }

  var xhr = null;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }
  else{
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var paramStr = "";
  for(var k in defaultParam.data){
    paramStr += k+'='+defaultParam.data[k]+"&";  
  }
  paramStr = paramStr.substr(0, paramStr.length-1);
  if(defaultParam.type == 'get'){
    xhr.open(defaultParam.type, defaultParam.url+"?"+paramStr,defaultParam.async)
  }else{
    xhr.open(defaultParam.type, defaultParam.url, defaultParam.async);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(paramStr);
  }

  xhr.onreadystatechange=function (){
    if(xhr.readyState==4){
      if(xhr.status==200){
        defaultParam.success(xhr.responseText);
      }
    }
  }
}

