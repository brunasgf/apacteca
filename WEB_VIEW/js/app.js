const app = angular.module('apacteca', [
    'ngRoute',
    'ngDialog',
    'ngAnimate',
    'toastr'
])

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start
        return input.slice(start)
    }
});