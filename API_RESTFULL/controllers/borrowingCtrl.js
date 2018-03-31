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
                }else{
                    const pessoa = new Pessoa()

                    return pessoa.create(params)
                    .then((res)=>{
                        return Promise.resolve(res.insertId)
                    })
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

    getAllBorrowed(params){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `SELECT
                            obr.titulo 'titulo',
                            pss.nome 'nomePessoa',
                            data_emprestimo,
                            data_devolucao 
                        FROM apacteca_db.emprestimo as emp
                        INNER JOIN obra as obr ON obr.id_Obr = emp.obra_id
                        INNER JOIN pessoa as pss ON pss.id_pessoa = emp.pessoa_id
                        ${this.getFIlterQuery(params)} WHERE emp.data_devolucao IS NULL ORDER BY obr.titulo`
    
                        this.conn.query(sql, (err, result, fields)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(result)
                            }
                        })
                    }
                })
            })
        })
        .then((res)=>{
            this.conn.end()
            return Promise.resolve(res)
        })
        .catch((err)=>{
            this.conn.end()
            return Promise.reject(err)
        })
    }

}

module.exports = PersonController