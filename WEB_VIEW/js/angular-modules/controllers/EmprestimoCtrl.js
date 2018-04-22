const EmprestimoCtrl = angular.module('apacteca')

EmprestimoCtrl.controller('EmprestimoCtrl', ['$scope', 'Emprestimo', 'Notify',
    ($scope, Emprestimo, Notify) => {

        $scope.emprestimo = {
            // id_emprestimo : null,
            idObra : null,
            idPessoa: null,
            nomePessoa : null,
            titulo : null,
            data_emprestimo: null,
            data_devolucao: null
        }

        $scope.filter = {
            idObra : null,
            idPessoa : null,
            titulo : null,
            data_emprestimo: null,
            data_devolucao: null
        }

        $scope.listaEmprestimo = [];

        const OpenModalNovoEmprestimo = () => {

        }

        const getTodosEmprestimos = () => {
            return Emprestimo.getAll($scope.filter)
                .then((res) => {
                    $scope.listaEmprestimo = res.data.data;
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }


        $scope.getTodosEmprestimos = getTodosEmprestimos

    }
])

