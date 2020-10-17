/* function Animal(sound) {
  this.sound = sound;
  this.say = function () {
    console.log(this.sound);
  }
}

var cat=new Animal("喵~");
cat.say(); */

/* function Animal(sound) {
  this.sound = sound;
  this.say = function () {
    console.log(sound);
  }
}

var cat = new Animal("喵~");
cat.say(); */
// for (var i in cat) {
//   console.log(i);
//   console.log(cat[i]);
// }

function sort(arr){
  for(var i=0; i<arr.length; i++){
    for(var j=1;j<arr.length-i;j++){
      if(arr[j]<arr[j-1]){
        var temp=arr[j];
        arr[j]=arr[j-1];
        arr[j-1]=temp;
      }
    }
  }
  return arr;
}

console.log(sort([7, 6, 5, 4, 3, 2, 1]));