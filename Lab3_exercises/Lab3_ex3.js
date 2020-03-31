const say = require("say");

say.speak("Hello");

say.stop();

say.speak("Hello?, Alex", 0);

const sorryDave = () => {
    say.speak("I am sorry, Dave", 0)
};

setTimeout(sorryDave, 2000);