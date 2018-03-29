const Job = require("./jobCtrl")

class DvdController extends Job {
    constructor() {
        super()
    }

    create(params) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `INSERT INTO dvd (diretor, descrição) VALUES ("${params.diretor}","${params.descricao}")`

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
            .then((res)=>{
                params.idLivro = null
                params.idDvd = res.insertId
                return this.createJob(params)
            })
            .catch((err)=>{
                console.log(err)
                this.conn.end()
                return Promise.reject(err)
            })
    }
}

module.exports = DvdController