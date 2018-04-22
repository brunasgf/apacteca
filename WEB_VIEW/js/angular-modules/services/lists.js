const listSrv = angular.module("apacteca")

listSrv.service("Listas", ['$http',
    function ($http) {

        this.genderJob = () => {
            return $http.get(`http://localhost:8001/gender`)
        }

        this.typeJob = () => {
            return $http.get(`http://localhost:8001/type`)
        }

        this.statusJob = () => {
            return $http.get(`http://localhost:8001/status`)
        }

    }
])