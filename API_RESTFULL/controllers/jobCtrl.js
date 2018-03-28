const Queries = require("./queriesCtrl")

class JobController extends Queries {
    constructor() {
        super("obra", ['quantidade', 'tiulo', 'is_livro', 'is_dvd', 'genero_id', 'status_id'])
    }

    create(params){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log(params)
                        const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES (${params.qtd}, "${params.tiulo}", ${params.idLivro}, ${params.idDvd}, ${params.idGenero}, ${params.idStatus})`

                        this.conn.query(sql,(err, result)=>{
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

module.exports = JobController