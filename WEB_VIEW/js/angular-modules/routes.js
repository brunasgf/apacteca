const roures = angular.module('apacteca')

roures.config(($routeProvider) => {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/emprestimos", {
            templateUrl: "views/emprestimo.html"
        })
        .when("/obras", {
            templateUrl: "views/obras.html"
        })
        .when("/pessoas", {
            templateUrl: "views/pessoas.html"
        })
        .otherwise({
            templateUrl: "views/home.html"
        })
})