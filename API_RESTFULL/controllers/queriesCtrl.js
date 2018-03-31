const Config = require("../config/config")
const mysql = require("mysql")
const Promise = require("bluebird")

class Query{
    constructor(table, columns){
        this.config = new Config()
        this.table = table
        this.strColumns = columns.join(",")
        this.columns = columns
        this.conn = mysql.createConnection(this.config.getConfig())
    }
    
    createConnectionSQL(){
        return new Promise((resolve, reject)=>{
            this.conn = mysql.createConnection(this.config.getConfig())
            resolve()
        })
    }

    update(params, id){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log(params)
                        const sql = `UPDATE ${this.table} SET ${this.getQueryParams(params)} WHERE id_${this.table} = ${id}`
    
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

    getQueryParams(params){
        const keys = Object.keys(params)
        let strQuery = ""
        for(let i = 0; i < keys.length; i++){
            if(i == keys.length - 1){
                if(isNaN(parseInt(keys[i]))){
                    strQuery += `${keys[i]} = "${params[keys[i]]}"`
                }else{
                    strQuery += `${keys[i]} = ${params[keys[i]]}`
                }
            }else{
                if(isNaN(parseInt(keys[i]))){
                    strQuery += `${keys[i]} = "${params[keys[i]]}", `
                }else{
                    strQuery += `${keys[i]} = ${params[keys[i]]}, `
                }
            }
        }

        return strQuery
    }

    getById(id){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `SELECT * FROM ${this.table} WHERE id_${this.table} = ${id}`
    
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

    getAll(){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `SELECT * FROM ${this.table} ORDER BY id_${this.table}`
    
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

    delete(id){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        const sql = `DELETE FROM ${this.table} WHERE id_${this.table} = ${id}`
    
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

module.exports = Query