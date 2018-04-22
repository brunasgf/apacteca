const roures = angular.module('apacteca')

roures.config(($routeProvider) => {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/emprestimos", {
            templateUrl: "views/emprestimo/index.html"
        })
        .when("/obras", {
            templateUrl: "views/obras/index.html"
        })
        .when("/pessoas", {
            templateUrl: "views/pessoa/index.html"
        })
        .otherwise({
            templateUrl: "views/home.html"
        })
})