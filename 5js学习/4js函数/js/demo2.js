// function fun1(){
//   console.log("fun1");
//   function fun2(){
//     console.log("fun2");
//   }
// }

// fun1() //输出 fun1

// function fun1() {
//   console.log("fun1");
//   function fun2() {
//     console.log("fun2");
//   }
//   fun2(); //当fun1()被执行时，fun2()才会被执行，输出 fun2
// }

// fun1(); //输出 fun1, fun2

// fun2();//会发生错误 error

/* function fun1() {
  console.log("fun1");
  function fun2() {
    console.log("fun2");
  }
  return fun2; 
}

fun1(); 

var fun3 = fun1();
fun3(); */

/* (function fun1(){
  console.log("fun1");
})()
 */

/* (function (str){
  console.log(str);
})("hello") */

/* var a=function fun(){
  console.log("hello");
} */

var a="hello";
function fun(){
  console.log(a);
}

fun();

function fun1(){
  var b="world";
  function fun2(){
    console.log(a);
    console.log(b);
    function fun3(){
      console.log(b);
    }
    fun3();
  }
  fun2();
}
fun1();