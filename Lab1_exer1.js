function titleCase(str) {

    var splitStr = str.toLowerCase().split(' ');
    console.log(splitStr);

    for (var i = 0; i < splitStr.length; i++){
        var word = splitStr[i][0].toUpperCase() + splitStr[i].slice(1);
        
        console.log(word);
    }
}

titleCase('the quick brown fox')


// var outer 
// outer =+ outer.toUpperCase().split(' ') + 