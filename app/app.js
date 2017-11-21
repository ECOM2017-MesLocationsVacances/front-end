var app = angular.module('myApp', [
    'ngRoute'
]);
app.controller('searchResults', function($scope){
    $scope.bddHouses = [
        {photo:'32477145.png',name:'Gite du Brillant',place:'Nice',nbRoom:'5',shortDesc:'LE meilleur gite de la région'},
        {photo:'32477145.png',name:'Gite du Soyeux',place:'Nice',nbRoom:'3',shortDesc:'Le second meilleur gite'},
        {photo:'32477145.png',name:'Poubelle El divina',place:'Paris',nbRoom:'1',shortDesc:'Un excellent logement dans la ville de l amour'},
        {photo:'32477145.png',name:'Hotel de Californie',place:'Grenoble',nbRoom:'42',shortDesc:'Le fameux hotel de la chanson'},
        {photo:'32477145.png',name:'Chez Roger le Tavernier',place:'Meylan',nbRoom:'4',shortDesc:'Bienvenue dans mon humble taverne'}
    ]
   });


app.controller('dateController', function ($scope, uibDateParser) {
    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();
});
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'home.html'
        })
        .when('/home', {
            templateUrl : 'home.html'
        })
        .when('/loginPage', {
            templateUrl : 'login.html'
        })
        .otherwise({
            templateUrl : '404.html'
        })

});