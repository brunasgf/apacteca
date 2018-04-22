const EmprestimoCtrl = angular.module('apacteca')

EmprestimoCtrl.controller('EmprestimoCtrl', ['$scope', 'Emprestimo', 'Obra', 'Notify', 'toastr',
    ($scope, Emprestimo, Obra, Notify, toastr) => {

        $scope.emprestimo = {
            idemprestimo: null,
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

        $scope.obra = {
            id_Obra: null,
            titulo: null,
            idTipo: null,
            autor: null,
            idGenero: null,
            idStatus: null
        }

        $scope.pessoa = {
            nome: null,
            rg: null
        }

        $scope.listaEmprestimo = [];
        $scope.isDisabled = true;
        $scope.listaObra = [];

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
                    toastr.success(res.data.message, "Tudo Certo")
                    $scope.closeThisDialog()
                })
                .catch((err) => {
                    toastr.error(err.data.message, "Ops Algo de errado Aconteceu")
                })
        }


        const getTodosEmprestimos = () => {
            return Emprestimo.getAll($scope.filter)
                .then((res) => {
                    $scope.listaEmprestimo = res.data.data;
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em vizualizar os emprestimos :(")
                })
        }

        const getObras = () => {
            return Obra.getAll($scope.obra)
                .then((res) => {
                    $scope.listaObra = res.data.data;
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em escolher as obras :(")
                })
        }

        const getPessoa = (rg) => {
            if (rg.length >= 5) {
                return Emprestimo.getPerson(rg)
                    .then((res) => {
                        if (res && res.data && res.data.length) {
                            $scope.isDisabled = true
                            $scope.emprestimo.rgPessoa = res.data[0].rg
                            $scope.emprestimo.nomePessoa = res.data[0].nome
                        } else {
                            $scope.isDisabled = false
                            $scope.emprestimo.nomePessoa = ""
                        }
                    })
            } else {
                toastr.error("O Rg deve ter no minimo 5 caracteres", "Ops Cuidado")
                $scope.isDisabled = true
                $scope.emprestimo.nomePessoa = ""
            }
        }

        const devolverLivro = (idEmprestimo) => {
            return Emprestimo.devolverLivro(idEmprestimo)
                .then((res) => {
                    toastr.success(res.data.message, "Tudo Certo")
                    getTodosEmprestimos()
                })
                .catch((err) => {
                    toastr.error(err.data.message, "Algo de errado Aconteceu")
                })
        }

        const getFormatedData = (data) => {
            const date = new Date(parseInt(data));
            const msg = date.toLocaleString();
            if (msg == 'Invalid Date') {
                return '-';
            } else {
                return msg;
            }
        }

        $scope.getPessoa = getPessoa
        $scope.getObras = getObras
        $scope.getFormatedData = getFormatedData
        $scope.adicionarEmprestimo = adicionarEmprestimo
        $scope.getTodosEmprestimos = getTodosEmprestimos
        $scope.OpenModalNovoEmprestimo = OpenModalNovoEmprestimo
        $scope.devolverLivro = devolverLivro

    }
])

