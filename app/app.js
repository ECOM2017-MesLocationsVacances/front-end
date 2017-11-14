var app = angular.module('myApp', [
    'ngRoute'
]);

app.controller('dateController', function ($scope, uibDateParser) {
    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();
});

