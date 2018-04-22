const GenderController = require('../controllers/genderCtrl')

class RouteGender {
    constructor(app) {
        this.genderController = new GenderController()
        this.app = app

        this.app.route('/gender')
            .get((req, res) => {
                this.genderController.getAll(req.body)
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

module.exports = RouteGender	