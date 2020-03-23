// function gretter(myArray) {

//     var greetText = 'hello ';

//     for (var index = 0; index < myArray.length; index++) {
//         console.log(greetText + myArray[index]);
//     }
// }
// gretter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'])



var gretter = (myArray) => {

    var greetText = 'hello ';

    for (let newArray of myArray) {
        console.log(greetText + newArray);
    }
}
gretter(['Randy Savage', 'Ric Flair', 'Hulk Hogan']);