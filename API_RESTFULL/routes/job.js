const JobController = require('../controllers/jobCtrl')
const Job = require('../models/job')

class RouteJob{
	constructor(app){
		this.jobController = new JobController()
		this.app = app
		this.resp = {
			sucess: null,
			error: null,
			message: null,
			data: {}
		}

		this.app.route('/job/getAll')
		.post((req, res) => {
			this.jobController.getAll(req.body)
			.then(response => {
				res.status(200)
				this.resp.sucess = true
				this.resp.data = response
				res.json(this.resp)
			})
			.catch((err)=>{
				console.log(err)
			})
		})

		this.app.route('/job')
		.post((req, res) => {
			const job = new Job(req.body.qtd, req.body.titulo, req.body.idGenero, req.body.idTipo, req.body.autor, req.body.descricao)
			return job.validateParams()
				.then((Job)=>{
					return this.jobController.create(Job)
				})	
				.then(response => {
					res.status(200)
					this.resp.sucess = true
					this.resp.message = "Obra inserida com sucesso!"
					this.resp.data = req.body
					this.resp.data.id = response.insertId
					res.json(this.resp)
				})
				.catch((err)=>{
					res.status(err.statusCode)
					this.resp.error = true
					this.resp.message = err.message
					this.resp.data = req.body
					res.json(this.resp)
				})
		})

		this.app.route('/job/:id')
		.get((req, res) => {
			return this.jobController.getById(req.params.id)
			.then(response => {
				res.status(200)
				this.resp.sucess = true
				this.resp.data = response
				res.json(this.resp)
			})
			.catch((err)=>{
				console.log(err)
			})
		})
		.put((req, res) => {
			const job = new Job(req.body.qtd, req.body.titulo, req.body.idGenero, req.body.idTipo, req.body.autor, req.body.descricao)
			return job.validateParams()
			.then((Job)=>{
				if(req.params.id){
					return this.jobController.update(Job, req.params.id)
				}else{
					const err = {}
					err.statusCode = 400
					err.message = "Obra com id especificado, não foi encontrada"
					return Promise.reject(err)
				}
			})
			.then(response => {
				res.status(200)
				this.resp.sucess = true
				this.resp.message = "Obra atualizada com sucesso!"
				this.resp.data = req.body
				this.resp.data.id = req.params.id
				res.json(this.resp)
			})
			.catch((err)=>{
				console.log(err)
				res.status(err.statusCode)
				this.resp.error = true
				this.resp.message = err.message
				this.resp.data = req.body
				res.json(this.resp)
			})
		})
		.delete((req, res) => {
			this.jobController.delete(req.params.id)
			.then(response => {
				res.status(200)
				this.resp.sucess = true
				this.resp.message = "Obra deletada com sucesso!"
				res.json(this.resp)
			})
			.catch((err)=>{
				console.log(err)
			})
		})
	}
}

module.exports = RouteJob	