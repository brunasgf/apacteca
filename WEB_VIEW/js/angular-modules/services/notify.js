const notify = angular.module("apacteca")

notify.service("Notify", ['ngDialog',
    function (ngDialog) {
        this.openModalTemplate = function (title, url) {
            return ngDialog.open({
                template: url,
                className: 'ngdialog-theme-default',
                width: '60%',
            });
        }

        this.openConfirm = function (data) {
            return ngDialog.openConfirm({
                template: `
                <div class="row">
                    <div class="col-12 text-center">
                        <h1 class="main-title">Exclusão</h1>
                    </div>

                    <div class="col-12 atencoius-text">
                        Deseja realmente excluir esse item???
                    </div>

                    <div class="col-12 text-right">
                        <button class="btn btn-info btn-round" ng-click="closeThisDialog(false)">
                            Cancelar
                        </button>
                        <button class="btn btn-danger btn-round" ng-click="confirm(true)">
                            Excluir
                        </button>
                    </div>
                </div>
                `,
                plain: true,
                className: 'ngdialog-theme-default',
                data: data,
                width: '20%'
            })
        }
    }
])