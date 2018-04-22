const StatusController = require('../controllers/statusCtrl')

class RouteStatus {
    constructor(app) {
        this.statusController = new StatusController()
        this.app = app

        this.app.route('/status')
            .get((req, res) => {
                this.statusController.getAll(req.body)
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

module.exports = RouteStatus	