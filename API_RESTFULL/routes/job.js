const JobController = require('../controllers/jobCtrl')
const Job = require('../models/job')

class RouteJob {
    constructor(app) {
        this.jobController = new JobController()
        this.app = app

        this.app.route('/job/getAll')
            .post((req, res) => {
                this.jobController.getAll(req.body)
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: null,
                            data: response
                        }

                        res.json(resp)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })

        this.app.route('/job')
            .post((req, res) => {
                const job = new Job(req.body.qtd, req.body.titulo, req.body.idGenero, req.body.idTipo, req.body.autor, req.body.descricao)
                return job.validateParams()
                    .then((Job) => {
                        return this.jobController.create(Job)
                    })
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: "Obra inserida com sucesso!",
                            data: response.insertId
                        }

                        res.json(resp)
                    })
                    .catch((err) => {
                        res.status(err.statusCode)
                        const resp = {
                            sucess: false,
                            message: err.message,
                            data: req.body
                        }
                        res.json(resp)
                    })
            })

        this.app.route('/job/:id')
            .get((req, res) => {
                return this.jobController.getById(req.params.id)
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: null,
                            data: response
                        }
                        res.json(this.resp)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .put((req, res) => {
                const job = new Job(req.body.qtd, req.body.titulo, req.body.idGenero, req.body.idTipo, req.body.autor, req.body.descricao)
                return job.validateParams()
                    .then((Job) => {
                        if (req.params.id) {
                            return this.jobController.update(Job, req.params.id)
                        } else {
                            const resp = {
                                sucess: false,
                                statusCode: 400,
                                data: null,
                                message: "Obra com id especificado, não foi encontrada"
                            }

                            return Promise.reject(resp)
                        }
                    })
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: "Obra atualizada com sucesso!",
                            data: req.body
                        }
                        resp.data.id = req.params.id
                        res.json(resp)
                    })
                    .catch((err) => {
                        res.status(err.statusCode)
                        const resp = {
                            sucess: false,
                            message: err.message,
                            data: req.body
                        }
                        res.json(resp)
                    })
            })
            .delete((req, res) => {
                this.jobController.delete(req.params.id)
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: "Obra deletada com sucesso!",
                            data: null
                        }
                        res.json(resp)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
    }
}

module.exports = RouteJob	