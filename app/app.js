var app = angular.module('myApp', [
    'ngRoute'
]);
app.controller('searchResults', function($scope){
    $scope.bddHouses = [
        {photo:'pictures/32477145.png',name:'Gite du Brillant',place:'Nice',nbRoom:'5',shortDesc:'LE meilleur gite de la région'},
        {photo:'pictures/32477145.png',name:'Gite du Soyeux',place:'Nice',nbRoom:'3',shortDesc:'Le second meilleur gite'},
        {photo:'pictures/32477145.png',name:'Poubelle El divina',place:'Paris',nbRoom:'1',shortDesc:'Un excellent logement dans la ville de l amour'},
        {photo:'pictures/32477145.png',name:'Hotel de Californie',place:'Grenoble',nbRoom:'42',shortDesc:'Le fameux hotel de la chanson'},
        {photo:'pictures/32477145.png',name:'Chez Roger le Tavernier',place:'Meylan',nbRoom:'4',shortDesc:'Bienvenue dans mon humble taverne'}
    ]
   });

app.controller('locationPage', function($scope){
    $scope.bddHouses = [
        {photo:'32477145.png',name:'Gite du Brillant',place:'Nice',nbRoom:'5',shortDesc:'LE meilleur gite de la région'},
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
        .when('/searchResults', {
            templateUrl : 'searchResults.html'
        })
        .when('/loginPage', {
            templateUrl : 'login.html'
        })
        .when('/locationPage', {
            templateUrl : 'locationPage.html'
        })
        .otherwise({
            templateUrl : '404.html'
        })

});

var app = angular.module('sample', [])
    .directive('equalsTo', [function () {
        /*
         * <input type="password" ng-model="Password" />
         * <input type="password" ng-model="ConfirmPassword" equals-to="Password" />
         */
        return {
            restrict: 'A', // S'utilise uniquement en tant qu'attribut
            scope: true,
            require: 'ngModel',
            link: function (scope, elem, attrs, control) {
                var check = function () {
                    //Valeur du champs courant
                    var v1 = scope.$eval(attrs.ngModel); // attrs.ngModel = “ConfirmPassword”

                    //valeur du champ à comparer
                    var v2 = scope.$eval(attrs.equalsTo).$viewValue; // attrs.equalsTo = “Password”

                    return v1 == v2;
                };

                scope.$watch(check, function (isValid) {
                    // Défini si le champ est valide
                    control.$setValidity("equalsTo", isValid);
                });
            }
        };
    }]);