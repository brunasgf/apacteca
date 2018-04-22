const ObraCTrl = angular.module('apacteca')

ObraCTrl.controller('ObraCtrl', ['$scope', 'Notify', 'Obra', 'toastr', 'Listas',
    ($scope, Notify, Obra, toastr, Listas) => {

        $scope.obra = {
            titulo: null,
            idTipo: null,
            autor: null,
            idGenero: null,
            qtd: null,
            descricao: null
        }

        $scope.filtro = {
            titulo: null,
            idTipo: null,
            autor: null,
            idGenero: null,
            idStatus: null
        }

        $scope.obraView = {
            titulo: null,
            idTipo: null,
            autor: null,
            idGenero: null,
            qtd: null,
            descricao: null,
            status: null,
            idObra: null
        }

        $scope.isDisabled = true
        $scope.listaObra = []
        $scope.listaGenero = []
        $scope.listaTipo = []
        $scope.listaStatus = []

        const OpenModalCreate = () => {
            return Notify.openModalTemplate("./views/obras/criar.html")
                .closePromise
                .then(() => {
                    getTodasObras()
                })
                .catch(() => {
                    getTodasObras()
                })
        }

        const OpenModalUpdate = (isOnlyView, dadosObra) => {
            return Notify.openModalTemplate("./views/obras/editar.html", { isOnlyView: isOnlyView, dadosObra: dadosObra })
                .closePromise
                .then(() => {
                    getTodasObras()
                })
                .catch(() => {
                    getTodasObras()
                })
        }

        const getTodasObras = () => {
            return Obra.getAll($scope.filtro)
                .then((res) => {
                    $scope.listaObra = res.data.data
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        const adicionarObra = (obra) => {
            return Obra.create(obra)
                .then((res) => {
                    toastr.success(res.data.message, "Criado com sucesso")
                    $scope.closeThisDialog()
                })
                .catch((err) => {
                    toastr.error(err.data.message, "Algo não esta certo")
                })
        }

        const deletarObra = (id) => {
            return Notify.openConfirm()
                .then(() => {
                    return Obra.delele(id)
                        .then((res) => {
                            toastr.success(res.data.message, "Deletado com sucesso")
                        })
                        .catch((err) => {
                            toastr.error(err.data.message, "Algo não esta certo")
                        })
                })
                .then(() => {
                    getTodasObras()
                })
                .catch(() => {
                    toastr.info(`Sua obra esta sã e salva`, 'Não se preocupe :)')
                })
        }

        const getGenders = () => {
            return Listas.genderJob()
                .then((res) => {
                    $scope.listaGenero = res.data.data
                    $scope.listaGenero.push({
                        id_genero: null,
                        nome: "Selecione um genero"
                    })
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em escolher os generos :(")
                })
        }

        const getStatus = () => {
            return Listas.statusJob()
                .then((res) => {
                    $scope.listaStatus = res.data.data
                    $scope.listaStatus.push({
                        id_status: null,
                        nome: "Selecione um status"
                    })
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em escolher os status :(")
                })
        }

        const getTypes = () => {
            return Listas.typeJob()
                .then((res) => {
                    $scope.listaTipo = res.data.data
                    $scope.listaTipo.push({
                        id_tipo: null,
                        nome: "Selecione um tipo"
                    })
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em escolher os tipos :(")
                })
        }

        const init = () => {
            return getTypes()
                .then(() => {
                    return getStatus()
                })
                .then(() => {
                    return getGenders()
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        const presetData = () => {
            $scope.obraView.titulo = $scope.ngDialogData.dadosObra.titulo
            $scope.obraView.idTipo = $scope.ngDialogData.dadosObra.idTipo
            $scope.obraView.autor = $scope.ngDialogData.dadosObra.autor
            $scope.obraView.idGenero = $scope.ngDialogData.dadosObra.idGenero
            $scope.obraView.qtd = $scope.ngDialogData.dadosObra.qtd_total
            $scope.obraView.descricao = $scope.ngDialogData.dadosObra.descricao
            $scope.obraView.status = $scope.ngDialogData.dadosObra.status
            $scope.obraView.idObra = $scope.ngDialogData.dadosObra.id_Obra
        }

        const editarObra = (obra) => {
            return Obra.update(obra, obra.idObra)
                .then((res) => {
                    toastr.success(res.data.message, "Atualizado com sucesso")
                    $scope.closeThisDialog()
                })
                .catch((err) => {
                    toastr.error(err.data.message, "Algo não esta certo")
                })
        }

        $scope.OpenModalCreate = OpenModalCreate
        $scope.adicionarObra = adicionarObra
        $scope.OpenModalUpdate = OpenModalUpdate
        $scope.deletarObra = deletarObra
        $scope.getTodasObras = getTodasObras
        $scope.init = init
        $scope.presetData = presetData
        $scope.editarObra = editarObra
    }
])