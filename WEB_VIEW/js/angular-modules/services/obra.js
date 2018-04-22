const obraSrv = angular.module("apacteca")

obraSrv.service("Obra", ['$http',
    function ($http) {

        this.create = (obra) => {
            const request = {
                qtd: obra.qtd,
                titulo: obra.titulo,
                idGenero: obra.idGenero,
                idTipo: obra.idTipo,
                autor: obra.autor,
                descricao: obra.descricao
            }

            return $http.post(`http://localhost:8001/job`, request)
        }

        this.update = (obra, id) => {
            const request = {
                qtd: obra.qtd,
                titulo: obra.titulo,
                idGenero: obra.idGenero,
                idTipo: obra.idTipo,
                autor: obra.autor,
                descricao: obra.descricao
            }

            return $http.put(`http://localhost:8001/job/${id}`, request)
        }

        this.delele = (id) => {
            return $http.delete(`http://localhost:8001/job/${id}`)
        }

        this.getAll = (filter) => {
            const request = {
                autor: filter.autor,
                titulo: filter.titulo,
                idTipo: filter.idTipo,
                idStatus: filter.idStatus,
                idGenero: filter.idGenero
            }
            return $http.post(`http://localhost:8001/job/getall`, request)
        }

    }
])