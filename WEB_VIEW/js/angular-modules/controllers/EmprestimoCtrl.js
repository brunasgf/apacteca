const EmprestimoCtrl = angular.module('apacteca')

EmprestimoCtrl.controller('EmprestimoCtrl', ['$scope', 'Emprestimo', 'Obra', 'Notify',
    ($scope, Emprestimo, Obra, Notify) => {

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
                    console.log($scope.listaEmprestimo);
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        const getObras = () => {
            return Obra.getAll($scope.obra)
                .then((res) => {
                    $scope.listaObra = res.data.data;
                    console.log($scope.listaObra);
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em escolher as obras :(")
                })
        }

        const getPessoa = () =>{

           // $scope.nomePessoa = "@";

           return Emprestimo.getPessoa($scope.numRG)
           .then((res) => {
               $scope.pessoa = res.data.data;
               console.log($scope.pessoa);
           })
           .catch((err) => {
               toastr.error("Algo de errado aconteceu", "Você pode ter problemas em escolher as obras :(")
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

    }
])

