const EmprestimoCtrl = angular.module('apacteca')

EmprestimoCtrl.controller('EmprestimoCtrl', ['$scope', 'Emprestimo', 'Notify',
    ($scope, Emprestimo, Notify) => {

        $scope.emprestimo = {
            // id_emprestimo : null,
            idObra: null,
            idPessoa: null,
            nomePessoa: null,
            rgPessoa: null,
            titulo: null,
            data_emprestimo: null,
            data_devolucao: null
        }

        $scope.filter = {
            idObra: null,
            idPessoa: null,
            titulo: null,
            data_emprestimo: null,
            data_devolucao: null
        }

        $scope.listaEmprestimo = [];
        $scope.isDisabled = true

        const OpenModalNovoEmprestimo = () => {
            return Notify.openModalTemplate("./views/emprestimo/criar.html")
                .closePromise
                .then(() => {
                    getTodosEmprestimos()
                })
                .catch(() => {
                    getTodosEmprestimos()
                })
        }

        const adicionarEmprestimo = (emprestimo) => {
            return Emprestimo.create(emprestimo)
                .then((res) => {
                    console.log(res, "Criado com sucesso: EmprestimoCtrl")
                    $scope.closeThisDialog()
                })
                .catch((err) => {
                    console.log(err, "Algo não esta certo: EmprestimoCtrl")
                })
        }


        const getTodosEmprestimos = () => {
            return Emprestimo.getAll($scope.filter)
                .then((res) => {
                    $scope.listaEmprestimo = res.data.data;
                    console.log(emprestimo)
                })
                .catch((err) => {
                    console.log(err)
                })
        }


        const getFormatedData = (data) => {
            const date = new Date(parseInt(data));
            const msg = date.toLocaleString();
            if(msg == 'Invalid Date'){
                return '-';
            }else {
                return msg;
            }
        }

        $scope.getFormatedData = getFormatedData
        $scope.adicionarEmprestimo = adicionarEmprestimo
        $scope.getTodosEmprestimos = getTodosEmprestimos
        $scope.OpenModalNovoEmprestimo = OpenModalNovoEmprestimo

    }
])

