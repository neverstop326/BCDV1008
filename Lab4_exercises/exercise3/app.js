const events = require("events");
const eventEmitter = new events.EventEmitter();

const callHandler = () => {
    console.log('Alarm has been triggered!');
    eventEmitter.emit('alarm');
}

const alarmHandler = () => {
    console.log('call 911!');
}

eventEmitter
    .on('call', callHandler)
    .on('alarm', alarmHandler);


eventEmitter.emit('call');