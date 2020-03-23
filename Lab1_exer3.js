function question3 (str) {

    str.toLowerCase.split;
    console.log(str.slice(3,6));
    console.log(str.slice(0,3));

    var word = str.slice(3,6) + str.slice(0,3);
    
    console.log(word);
}

question3 ('Python');