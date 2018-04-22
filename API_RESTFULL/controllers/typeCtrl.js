const Queries = require("./queriesCtrl")

class TypeController extends Queries {
    constructor() {
        super("tipo", ['nome'])
    }
}

module.exports = TypeController