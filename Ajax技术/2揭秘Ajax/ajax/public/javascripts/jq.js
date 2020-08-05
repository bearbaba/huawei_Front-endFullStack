
alert("jquery")

/* $(document).ready(function (){
  $("#name").html("hello world");

  $.get("/ajax", function(){
    console.log(variable);
  }, "script")

}) */

$(function (){
  $.ajax({
    url: '/ajax',
    dataType: 'script',
    success: function(){
      console.log(variable);
    }
  })
})