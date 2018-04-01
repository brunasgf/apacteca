class Job {
    constructor(qtd, titulo, idGenero, idTipo, autor, descricao){
        this.qtd = qtd
        this.titulo = titulo
        this.idGenero = idGenero
        this.idTipo = idTipo
        this.autor = autor
        this.descricao = descricao

        this.error = {
            statusCode: null,
            message: null
        }
    }

    validateParams(){
        if(!this.qtd){
            this.error.statusCode = 400
            this.error.message = "É necessário preencher a quantidade"
            return Promise.reject(this.error)
        }else if(!this.titulo){
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o titulo"
            return Promise.reject(this.error)
        }else if(!this.idGenero){
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o genero"
            return Promise.reject(this.error)
        }else if(!this.idTipo){
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o tipo"
            return Promise.reject(this.error)
        }else if(!this.autor){
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o autor"
            return Promise.reject(this.error)
        }else if(!this.descricao){
            this.error.statusCode = 400
            this.error.message = "É necessário preencher a descricao"
            return Promise.reject(this.error)
        }else{
            return Promise.resolve(this)
        }
    }
}

module.exports = Job