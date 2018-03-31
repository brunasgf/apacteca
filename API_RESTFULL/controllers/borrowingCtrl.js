const Queries = require("./queriesCtrl")
const Pessoa = require("./personCtrl")
const Moment = require("moment")

class PersonController extends Queries {
    constructor() {
        super("emprestimo", ['obra_id', 'pessoa_id', 'data_emprestimo', 'data_devolucao'])
    }

    create(params) {
        return this.createConnectionSQL()
            .then(()=>{
                if(!params.idPessoa){
                    const pessoa = new Pessoa()

                    return pessoa.getByRg(params.rg)
                }else{
                    return Promise.resolve(false)
                }
            })
            .then((res)=>{
                if(res && res.length){
                    Promise.resolve(res[0].id_pessoa)
                }
            })
            .then((idPessoa) => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            console.log(params)
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES (${params.idObra}, ${idPessoa}, "${Moment().format("DD/MM/YYYY")}", null)`

                            this.conn.query(sql, (err, result) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(result)
                                }
                            })
                        }
                    })
                })
            })
            .then((res) => {
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }

}

module.exports = PersonController