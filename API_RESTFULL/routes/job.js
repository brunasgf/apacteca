const JobController = require('../controllers/jobCtrl')
const Livro = require("../controllers/bookCtrl")
const Dvd = require("../controllers/dvdCtrl")

class RouteJob{
	constructor(app){
		this.jobController = new JobController()
		this.app = app

		this.app.route('/job')
		.get((req, res) => {
			this.jobController.getAll()
			.then(response => {
				res.status(200)
				res.json(response)
			})
			.catch((err)=>{
				console.log(err)
			})
		})
		.post((req, res) => {
		const body = req.body
		return new Promise((resolve, reject)=>{
			if(body.autor){
				const livro = new Livro()
				resolve(livro.create(body))
			}else if(body.diretor && body.descricao){
				const dvd = new Dvd()
				resolve(dvd.create(body))
			}
		})
			.then(response => {
				res.status(200)
				res.json(response)
			})
			.catch((err)=>{
				console.log(err)
			})
		})

		this.app.route('/job/:id')
		.get((req, res) => {
			this.jobController.getById(req.params.id)
			.then(response => {
				res.status(200)
				res.json(response)
			})
			.catch((err)=>{
				console.log(err)
			})
		})
		.put((req, res) => {
			this.jobController.update(req.body, req.params.id)
			.then(response => {
				res.status(200)
				res.json(response)
			})
			.catch((err)=>{
				console.log(err)
			})
		})
		.delete((req, res) => {
			this.jobController.delete(req.params.id)
			.then(response => {
				res.status(200)
				res.json(response)
			})
			.catch((err)=>{
				console.log(err)
			})
		})
	}
}

module.exports = RouteJob