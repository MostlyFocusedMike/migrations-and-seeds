const ObjectionBoiler = require('./objection-boiler');

class User extends ObjectionBoiler {
    greet() {
        console.log(`My name is ${this.name}`)
    }
}

module.exports = User;
