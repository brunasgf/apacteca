const Queries = require("./queriesCtrl")

class genderController extends Queries {
    constructor() {
        super("genero", ['nome'])
    }
}

module.exports = genderController