const bodyParser = require('body-parser')
const express = require('express')
const RouterJob = require("./routes/job")
const RouterPerson = require("./routes/person")
const RouterType = require("./routes/type")
const RouterGender = require("./routes/gender")
const RouterStatus = require("./routes/status")
const RouterBorrow = require("./routes/borrow")
const Config = require('./config/config')

class App {
    constructor() {
        this.app = express()
        this.app.all('*', function (req, res, next) {
            var responseSettings = {
                "AccessControlAllowOrigin": req.headers.origin,
                "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
                "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
                "AccessControlAllowCredentials": true
            }
            res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials)
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token")
            res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
            res.header()
            next()
        })
        this.app.use(bodyParser.json())
        this.routerJob = new RouterJob(this.app)
        this.routerStatus = new RouterStatus(this.app)
        this.routerGender = new RouterGender(this.app)
        this.routertype = new RouterType(this.app)
        this.routerPerson = new RouterPerson(this.app)
        this.routerBorrow = new RouterBorrow(this.app)
    }
}

module.exports = App