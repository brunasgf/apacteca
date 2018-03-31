const Queries = require("./queriesCtrl")

class PersonController extends Queries {
    constructor() {
        super("pessoa", ['nome', 'identidade'])
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
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES ("${params.nome}", "${params.identidade}")`

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

}

module.exports = PersonController