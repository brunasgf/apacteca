const Queries = require("./queriesCtrl")

class JobController extends Queries {
    constructor() {
        super("obra", ['qtd', 'titulo', 'genero_id', 'status_id', 'tipo_id', 'autor', 'descricao'])
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
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES (${params.qtd}, "${params.titulo}", ${params.idGenero}, 2, ${params.idTipo}, "${params.autor}", "${params.descricao}")`

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

                            const sql = `SELECT id_Obra,
                            qtd,
                            titulo,
                            gen.nome 'genero',
                            gen.id_genero 'idGenero',
                            sta.nome 'status',
                            sta.id_status 'idStatus',
                            tip.nome 'tipo',
                            tip.id_tipo 'idTipo',
                            autor,
                            descricao
                        FROM apacteca_db.obra as obr
                        INNER JOIN genero as gen ON gen.id_genero = obr.genero_id
                        INNER JOIN status as sta ON sta.id_status = obr.status_id
                        INNER JOIN tipo as tip ON tip.id_tipo= obr.tipo_id
                        ${this.getFilterQuery(params)}ORDER BY id_obra`

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

    getById(id) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {

                            const sql = `SELECT id_Obra,
                            qtd,
                            titulo,
                            gen.nome 'genero',
                            sta.nome 'status',
                            tip.nome 'tipo',
                            autor,
                            descricao
                        FROM apacteca_db.obra as obr
                        INNER JOIN genero as gen ON gen.id_genero = obr.genero_id
                        INNER JOIN status as sta ON sta.id_status = obr.status_id
                        INNER JOIN tipo as tip ON tip.id_tipo= obr.tipo_id
                        WHERE id_Obra = ${id}`

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
                if (keys[i] === 'autor' && params[keys[i]]) {
                    query.push(`autor LIKE '%${params[keys[i]]}%'`)
                } else if (keys[i] === 'titulo' && params[keys[i]]) {
                    query.push(`titulo LIKE '%${params[keys[i]]}%'`)
                } else if (keys[i] === 'idTipo' && params[keys[i]]) {
                    query.push(`tipo_id  = ${params[keys[i]]}`)
                } else if (keys[i] === 'idStatus' && params[keys[i]]) {
                    query.push(`status_id = ${params[keys[i]]}`)
                } else if (keys[i] === 'idGenero' && params[keys[i]]) {
                    query.push(`genero_id = ${params[keys[i]]}`)
                }
            }

            if (query.length) {
                resp = `WHERE ${query.join(" AND ")} `
            }
        }
        return resp
    }


    update(params, id) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            console.log(params)
                            const sql = `UPDATE ${this.table} SET 
                            qtd = ${params.qtd},
                            titulo = "${params.titulo}",
                            genero_id = ${params.idGenero},
                            tipo_id = ${params.idTipo},
                            autor = "${params.autor}",
                            descricao = "${params.descricao}"
                        WHERE id_${this.table} = ${id}`

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

module.exports = JobController  