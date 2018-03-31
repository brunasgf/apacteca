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
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES (${params.qtd}, "${params.titulo}", ${params.idGenero}, 1, ${params.idTipo}, "${params.autor}", "${params.descricao}")`

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

                        `SELECT id_Obra,
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
                        ${this.getFIlterQuery(params)} ORDER BY id_obra`
    
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

    getById(id){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{

                        `SELECT id_Obra,
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

                if(keys[i] === 'autor'){
                    query += `autor LIKE '%${params[keys[i]]}%'`
                } else if(keys[i] === 'titulo'){
                    query += `titulo LIKE '%${params[keys[i]]}%'`
                } else if(keys[i] === 'idTipo'){
                    query += `tipo_id  = ${params[keys[i]]}`
                } else if(keys[i] === 'idStatus'){
                    query += `status_id = ${params[keys[i]]}`
                } else if(keys[i] === 'idGenero'){
                    query += `genero_id = ${params[keys[i]]}`
                }
            }
        }

        return query
    }    
}

module.exports = JobController  