const BorrowController = require('../controllers/borrowingCtrl')
const Borrow = require('../models/borrow')

class RouteBorrow {
    constructor(app) {
        this.borrowController = new BorrowController()
        this.app = app

        this.app.route('/borrow/getAll')
            .post((req, res) => {
                this.borrowController.getAllBorrowed(req.body)
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: "Emprestimo realizado com sucesso",
                            data: response
                        }

                        res.json(resp)
                    })
                    .catch((err) => {
                        res.status(err.statusCode)
                        const resp = {
                            sucess: false,
                            message: err.message,
                            data: null
                        }

                        res.json(resp)
                    })
            })

        this.app.route('/borrow')
            .post((req, res) => {
                const borrow = new Borrow(req.body.idObra)
                return borrow.validateParams()
                    .then(() => {
                        return this.borrowController.create(req.body)
                    })
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: "emprestimo realizado com sucesso!",
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

        this.app.route('/borrow/:id')
            .get((req, res) => {
                return this.borrowController.getById(req.params.id)
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
    }
}

module.exports = RouteBorrow	