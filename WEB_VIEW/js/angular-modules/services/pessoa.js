const pessoaSrv = angular.module("apacteca")

pessoaSrv.service("Pessoa", ['$http',
    function ($http) {

        this.getAll = (filter) => {
            const request = {
                nome: filter.nome,
                rg: filter.rg
            }
            return $http.post(`http://localhost:8001/person/getall`, request)
        }

        this.getHistories = (id) => {
            return $http.get(`http://localhost:8001/person/getHistories/${id}`)
        }

    }
])