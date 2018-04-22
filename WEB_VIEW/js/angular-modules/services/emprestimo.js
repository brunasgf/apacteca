const emprestimoSrv = angular.module("apacteca")

emprestimoSrv.service("Emprestimo", ['$http',
    function ($http) {

        this.getAll = (filter) => {
            const request = {
                obra_id : filter.idObra,
                pessoa_id : filter.idPessoa,
                data_emprestimo : filter.data_emprestimo,
                data_devolucao : filter.data_devolucao
            }
            //console.log(request);
            return $http.post(`http://localhost:8001/borrow/getAll`, request)
        }
        
        this.create = (emprestimo) => {
            const request = {
                idObra : emprestimo.idObra,
                idPessoa : emprestimo.idPessoa,
                nomePessoa : emprestimo.nomePessoa,
                rgPessoa : emprestimo.rgPessoa,
                
            }

            return $http.post(`http://localhost:8001/borrow`, request)
        }

       
    }
])