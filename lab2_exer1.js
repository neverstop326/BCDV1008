// var difference = function(x) {
//     var myNum = x - 13;
//     if(myNum>13){
//         myNum=myNum*2;
//     }
//     return Math.abs(myNum);

// }



let difference = (x) => {
    var myNum = x - 13;
    if(myNum>13){
        myNum = myNum * 2;
    }
    return Math.abs(myNum);
}

console.log(difference(32));
console.log(difference(11));