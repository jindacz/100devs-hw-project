const EventEmitter = require('events')
// certain format of id
const uuid = require('uuid')

// console.log(uuid.v4());

// every time you log show a new ID
class Logger extends EventEmitter {
    log(msg){
        // call event
        this.emit('message',{ id: uuid.v4(), msg })
    }
}

// module.exports = Logger