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

app.controller('searchPanel', function($scope){

    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }

    $scope.query_search = function() {

        api_url="http://35.177.54.53";
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        city = document.getElementById("query");
        if (city.value != "") {
            url = url.concat("?city=").concat(city.value);
        }
        //console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);

                console.log(myArr);
                for (var room of myArr) {
                    //  {photo:'pictures/32477145.png',name:'Gite du Brillant',place:'Nice',nbRoom:'5',shortDesc:'LE meilleur gite de la région'},
                    console.log(room);

                    if (room.photo == undefined) {
                        room.photo = 'pictures/32477145.png';
                    }
                    house = {
                        photo: room.photo,
                        name: room.establishment.name,
                        place: room.establishment.place,
                        place: room.establishment.place,
                        nbRoom: '1',
                        shortDesc: ''
                    };

                    // a supprimer ?
                    bddHouses = [];

                    //TODO ajouter sous forme d'HTML.
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        //valeur en dur pour testing.
        //[{"id":11,"version":0,"price":42.00,"establishment":{"id":10,"version":0,"name":"Boulitre","place":"Bassin","manager":null},"name":"ThePlace"}]
        var test = '[{"id":11,"version":0,"price":42.00,"establishment":{"id":10,"version":0,"name":"Boulitre","place":"Bassin","manager":null},"name":"ThePlace"}]';

        var myArr = JSON.parse(test);

    }
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