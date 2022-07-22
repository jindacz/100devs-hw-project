const EventEmitter = require('events');

// create class
class MyEmitter extends EventEmitter{}

// init object
const myEmitter = new MyEmitter();

// Event listender
myEmitter.on('event', () => console.log('Event fired!'))

// Init event
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');

