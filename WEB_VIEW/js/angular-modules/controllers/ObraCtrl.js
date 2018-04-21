const ObraCTrl = angular.module('apacteca')

ObraCTrl.controller('ObraCtrl', ['$scope', 'Notify',
    ($scope, Notify) => {
        const OpenModalCreate = () => {
            return Notify.openModalTemplate("Nova Obra", "/views/obras/criar.html")
        }

        $scope.OpenModalCreate = OpenModalCreate
    }
])