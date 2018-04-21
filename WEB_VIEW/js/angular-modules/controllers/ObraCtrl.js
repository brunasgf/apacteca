const ObraCTrl = angular.module('apacteca')

ObraCTrl.controller('ObraCtrl', ['$scope', 'Notify', 'Obra', 'toastr',
    ($scope, Notify, Obra, toastr) => {

        $scope.obra = {
            titulo: null,
            idTipo: null,
            autor: null,
            idGenero: null,
            qtd: null,
            descricao: null
        }

        const OpenModalCreate = () => {
            return Notify.openModalTemplate("Nova Obra", "./views/obras/criar.html")
        }

        const adicionarObra = (obra) => {
            return Obra.create(obra)
                .then((res) => {
                    toastr.success(res.data.message, "Criado com sucesso")
                })
                .catch((err) => {
                    toastr.error(err.data.message, "Algo não esta certo")
                })
        }

        $scope.OpenModalCreate = OpenModalCreate
        $scope.adicionarObra = adicionarObra
    }
])