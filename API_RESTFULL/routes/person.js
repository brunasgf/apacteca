const PersonController = require('../controllers/personCtrl')
const Person = require('../models/person')

class RoutePerson{
	constructor(app){
		this.personController = new PersonController()
		this.app = app

		this.app.route('/person/getAll')
		.post((req, res) => {
			return new Person(req.body.nome, req.body.rg)
				.then((person)=>{
					return this.personController.getAll(person)
				})
				.then(response => {
					res.status(200)
					res.json(response)
				})
				.catch((err)=>{
					console.log(err)
					res.status(err.statusCode)
					res.json(err.message)
				})
		})

		this.app.route('/person/getByRg/:rg')
		.get((req, res) => {
			return this.personController.getByRg(req.params.rg)
			.then(response => {
				res.status(200)
				res.json(response)
			})
			.catch((err)=>{
				console.log(err)
				res.status(err.statusCode)
				res.json(err.message)
			})
		})
	}
}

module.exports = RoutePerson