const Queries = require("./queriesCtrl")

class statusController extends Queries {
    constructor() {
        super("status", ['nome'])
    }
}

module.exports = statusController