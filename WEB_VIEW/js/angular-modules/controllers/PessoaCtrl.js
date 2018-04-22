const PessoaCtrl = angular.module('apacteca')

PessoaCtrl.controller('PessoaCtrl', ['$scope', 'Pessoa', 'Notify',
    ($scope, Pessoa, Notify) => {

        $scope.filtro = {
            nome: null,
            rg: null
        }

        $scope.listaPessoas = []
        $scope.historico = []

        const getTodasPessoas = () => {
            return Pessoa.getAll($scope.filtro)
                .then((res) => {
                    $scope.listaPessoas = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        const getHistoricoPessoa = (id) => {
            return Pessoa.getHistories(id)
                .then((res) => {
                    $scope.historico = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        const getFormatedData = (data) => {
            const date = new Date(parseInt(data))
            return date.toLocaleString()
        }

        const openModalHistorico = (pessoa) => {
            return Notify.openModalTemplate("./views/pessoa/historico.html", { pessoa: pessoa })
        }

        $scope.getTodasPessoas = getTodasPessoas
        $scope.openModalHistorico = openModalHistorico
        $scope.getHistoricoPessoa = getHistoricoPessoa
        $scope.getFormatedData = getFormatedData
    }
])