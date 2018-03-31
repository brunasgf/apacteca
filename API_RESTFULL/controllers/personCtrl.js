const Queries = require("./queriesCtrl")
const Emprestimo = require("./borrowingCtrl")

class PersonController extends Queries {
    constructor() {
        super("pessoa", ['nome', 'rg'])
    }

    create(params) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            console.log(params)
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES ("${params.nome}", "${params.rg}")`

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

    getAll(params){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        `SELECT * FROM pessoa ${this.getFIlterQuery(params)} ORDER BY nome`
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

    getFIlterQuery(params){
        let query = ""
        let keys = Object.keys(params)
        if(keys.length){
            query += "WHERE "
            for(let i = 0 ; i < keys.length ; i++){
                if(i > 1){
                    query += "AND "
                }

                if(keys[i] === 'nome'){
                    query += `nome LIKE '%${params[keys[i]]}%'`
                } else if(keys[i] === 'rg'){
                    query += `rg LIKE '%${params[keys[i]]}%'`
                }
            }
        }

        return query
    }    

    getByRg(rg, columns = "*"){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `SELECT * FROM ${this.table} WHERE rg = ${rg}`
    
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

    getBorrowingHistory(id){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        `SELECT
                            obr.titulo 'titulo',
                            pss.nome 'nomePessoa',
                            data_emprestimo,
                            data_devolucao 
                        FROM apacteca_db.emprestimo as emp
                        INNER JOIN obra as obr ON obr.id_Obr = emp.obra_id
                        INNER JOIN pessoa as pss ON pss.id_pessoa = emp.pessoa_id
                        ${this.getFIlterQuery(params)} WHERE emp.pessoa_id = ${id} ORDER BY obr.titulo`
    
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