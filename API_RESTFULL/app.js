const bodyParser = require('body-parser')
const express = require('express')
const RouterJob = require("./routes/job")
const Config = require('./config/config')

class App {
    constructor(){
        this.app = express()
        this.app.all('*', function(req, res,next) {
            var responseSettings = {
                "AccessControlAllowOrigin": req.headers.origin,
                "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
                "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
                "AccessControlAllowCredentials": true
            }
            res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials)
            res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin)
            res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with")
            res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods)
            next()
        })
        this.app.use(bodyParser.json())
        this.routerJob = new RouterJob(this.app)
    }
}

module.exports = App