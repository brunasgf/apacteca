const Promise = require("bluebird")

class Person {
    constructor(nome, rg) {
        this.nome = nome
        this.rg = rg
        this.error = {
            statusCode: null,
            message: null
        }
    }

    validateParams() {
        if (!this.nome) {
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o nome"
            return Promise.reject(this.error)
        } else if (!this.rg) {
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o 'rg'"
            return Promise.reject(this.error)
        } else if (typeof this.nome == ! 'string') {
            this.error.statusCode = 400
            this.error.message = "Há algo incorreto no tipo de Nome"
            return Promise.reject(this.error)
        } else if (typeof this.rg == ! 'string') {
            this.error.statusCode = 400
            this.error.message = "Há algo incorreto no tipo do RG"
            return Promise.reject(this.error)
        } else {
            return Promise.resolve(this)
        }
    }
}

module.exports = Person