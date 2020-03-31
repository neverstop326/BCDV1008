let uc = require("upper-case");

console.log(uc.upperCase('string'));

const greeter = (counter, msg) => {
    for (var i = 0; i < counter; i++) 
    console.log(uc.upperCase(msg));
};



greeter(10, 'hello world');