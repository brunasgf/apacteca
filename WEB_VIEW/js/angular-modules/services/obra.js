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

            return $http.post("http://localhost:8001/job", request)
        }

    }
])