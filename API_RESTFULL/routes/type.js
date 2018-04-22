const TypeController = require('../controllers/typeCtrl')

class RouteType {
    constructor(app) {
        this.typeController = new TypeController()
        this.app = app

        this.app.route('/type')
            .get((req, res) => {
                this.typeController.getAll(req.body)
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
    }
}

module.exports = RouteType	