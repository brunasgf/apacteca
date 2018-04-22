class Job {
    constructor(idObra) {
        this.idObra = idObra

        this.error = {
            statusCode: null,
            message: null
        }
    }

    validateParams() {
        if (!this.idObra) {
            this.error.statusCode = 400
            this.error.message = "É necessário escolher a obra"
            return Promise.reject(this.error)
        } else if (typeof this.idObra !== 'number' && isNaN(this.idObra)) {
            this.error.statusCode = 415
            this.error.message = "há algo de errado na seleção da obra"
            return Promise.reject(this.error)
        } else {
            return Promise.resolve(this)
        }
    }
}

module.exports = Job