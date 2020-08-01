var btn = document.getElementById('btn');
btn.onclick = function (){
  // alert("click");
  var xhr = null;

  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }
  else if(window.ActiveXObject){
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.open('post', "/ajax", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send();

  xhr.onreadystatechange = function (){
    if(xhr.readyState==4){
      if(xhr.status==200){
        console.log(xhr.responseText);
      }
    }
  }
}