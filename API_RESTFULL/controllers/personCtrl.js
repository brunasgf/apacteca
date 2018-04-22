const Queries = require("./queriesCtrl")

class PersonController extends Queries {
    constructor() {
        super("pessoa", ['nome', 'rg', 'qtd_emprestimos_atvo', 'data_ultimo_emprestimo'])
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
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES ("${params.nomePessoa}", "${params.rgPessoa}", 0, '0')`

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

    getAll(params) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `SELECT * FROM pessoa ${this.getFilterQuery(params)} ORDER BY nome`
                            this.conn.query(sql, (err, result, fields) => {
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

    getFilterQuery(params) {
        let query = []
        let resp = ""
        let keys = Object.keys(params)
        if (keys.length) {
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] === 'nome' && params[keys[i]]) {
                    query.push(`nome LIKE '%${params[keys[i]]}%'`)
                } else if (keys[i] === 'rg' && params[keys[i]]) {
                    query.push(`rg LIKE '%${params[keys[i]]}%'`)
                }
            }

            if (query.length) {
                resp = `WHERE ${query.join(" AND ")} `
            }
        }
        return resp
    }

    getByRg(rg) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `SELECT * FROM ${this.table} WHERE rg = "${rg}"`

                            this.conn.query(sql, (err, result, fields) => {
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

    updateEmprestimoData(id, date) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `UPDATE pessoa SET data_ultimo_emprestimo = ${date} WHERE id_pessoa=${id}`

                            this.conn.query(sql, (err, result, fields) => {
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

    getBorrowingHistory(id) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `SELECT
                            obr.titulo 'titulo',
                            data_emprestimo 'dataEmprestimo',
                            data_devolucao 'dataDevolucao'
                        FROM apacteca_db.emprestimo as emp
                        INNER JOIN obra as obr ON obr.id_Obra = emp.obra_id
                        WHERE emp.pessoa_id = ${id} ORDER BY obr.titulo`

                            this.conn.query(sql, (err, result, fields) => {
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