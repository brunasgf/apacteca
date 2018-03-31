const JobController = require('../controllers/jobCtrl')
class RouteJob{
	constructor(app){
		this.jobController = new JobController()
		this.app = app

		this.app.route('/job/getAll')
		.post((req, res) => {
			this.jobController.getAll(req.body)
			.then(response => {
				res.status(200)
				res.json(response)
			})
			.catch((err)=>{
				console.log(err)
			})
		})

		this.app.route('/job')
		.post((req, res) => {
		const body = req.body
		return this.jobController.create(req.body)
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