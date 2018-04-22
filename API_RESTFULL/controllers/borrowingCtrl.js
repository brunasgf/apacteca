const Queries = require("./queriesCtrl")
const PessoaCtrl = require("./personCtrl")
const Pessoa = require("../models/person")
const Moment = require("moment")

let now = null
let idPessoaAtual = null

class borrowController extends Queries {
    constructor() {
        super("emprestimo", ['obra_id', 'pessoa_id', 'data_emprestimo', 'data_devolucao'])
    }

    create(params) {
        return this.createConnectionSQL()
            .then(() => {
                const error = {}
                if (!params.rgPessoa) {
                    error.statusCode = 400
                    error.message = "É necessário preencher o rg"
                    return Promise.reject(error)
                } else if (typeof params.rgPessoa !== 'string') {
                    error.statusCode = 400
                    error.message = "Há algo incorreto no tipo do RG"
                    return Promise.reject(error)
                } else {
                    const pessoaRG = new PessoaCtrl()
                    return pessoaRG.getByRg(params.rgPessoa)
                }
            })
            .then((res) => {
                if (res && res.length) {
                    console.log(res[0])
                    const agora = Moment().valueOf()
                    const ultimoEmprestimo = parseInt(res[0].data_ultimo_emprestimo)
                    const diff = agora - ultimoEmprestimo
                    const month = (1000 * 60 * 60 * 24 * 30)
                    console.log(diff)
                    if ((diff - month) >= 0) {
                        return Promise.resolve(res[0].id_pessoa)
                    } else {
                        const error = {}
                        error.statusCode = 400
                        error.message = "Só há a possibilidade de pegar outra obra quando completar um mês desde a ultima entrega"
                        return Promise.reject(error)
                    }
                } else {
                    const pessoa = new Pessoa(params.nomePessoa, params.rgPessoa)
                    return pessoa.validateParams()
                        .then(() => {
                            const pessoaCtrl = new PessoaCtrl()
                            return pessoaCtrl.create(params)
                        })
                        .then((res) => {
                            return Promise.resolve(res.insertId)
                        })
                        .catch((err) => {
                            console.log(err)
                            return Promise.reject(err)
                        })
                }
            })
            .then((idPessoa) => {
                idPessoaAtual = idPessoa
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            now = Moment().valueOf()
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES (${params.idObra}, ${idPessoa}, "${now}", null)`

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
            .then(() => {
                const pessoaCtrl = new PessoaCtrl()
                return pessoaCtrl.updateEmprestimoData(idPessoaAtual, now)
            })
            .then((res) => {
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                console.log(err)
                this.conn.end()
                return Promise.reject(err)
            })
    }

    getAllBorrowed(params) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `SELECT
                            obr.id_Obra 'idObra',
                            obr.titulo 'titulo',
                            pss.id_pessoa 'idPessoa',
                            pss.nome 'nomePessoa',
                            data_emprestimo,
                            data_devolucao 
                        FROM apacteca_db.emprestimo as emp
                        INNER JOIN obra as obr ON obr.id_Obra = emp.obra_id
                        INNER JOIN pessoa as pss ON pss.id_pessoa = emp.pessoa_id
                        ${this.getFilterQuery(params)} WHERE emp.data_devolucao IS NULL ORDER BY data_emprestimo`

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
}

module.exports = borrowController