var app = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap'
]);

app.service('modalService', function($uibModal,$uibModalStack){
    var modalService = {};
    modalService.openModal = function(url, controller){
        $uibModalStack.dismissAll('another modal just opened');
        modalService.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: url,
            controller: controller,
            controllerAs: '$ctrl'
        });
    };
    return modalService;
});


app.controller("connexionController",function($scope,$uibModalInstance){
    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
    $scope.connexion = function(){
        $uibModalInstance.close('save');
    };
});

app.controller("registerController",function($scope,$uibModalInstance){
    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
    $scope.connexion = function(){
        $uibModalInstance.close('save');
    };
});


app.controller('locationPage', function($scope){
    $scope.bddHouses = [
        {photo:'32477145.png',name:'Gite du Brillant',place:'Nice',nbRoom:'5',shortDesc:'LE meilleur gite de la région'},
        ]
});


app.controller('searchPanel', function($scope){

    $scope.query_search = function() {

        function addRoom(room) {

            if (room.photo == undefined) {
                room.photo = 'pictures/32477145.png';
            }

            $("#searchRes").append('' +
                '<div class="jumbotron" style="height:250px; padding:10px;">\n' +
                '    <div class="col-md-3" style="height:100%;">\n' +
                '        <img src="'+room.photo+'" style="height:100%;">\n' +
                '    </div>\n' +
                '    <div class="col-md-9 sResultsText" style="height:100%;">\n' +
                '        <h3>'+room.establishment.name+'</h3>\n' +
                '        <p>'+room.establishment.place+'</p>\n' +
                '        <p>'+1+'</p>\n' +
                '        <p>'+'short description'+'</p>\n' +
                '    </div>\n' +
                '    <div>\n' +
                '        <a href="#/locationPage">test page</a>\n' +
                '    </div>\n' +
                '</div>'
            )
        }

        api_url="http://35.177.136.202";
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        city = document.getElementById("queryPlace");
        if (city.value != "") {
            url = url.concat("?city=").concat(city.value);
        }
        //console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);

                $("#searchRes").html("");

                //console.log(myArr);
                for (var room of myArr) {
                    //  {photo:'pictures/32477145.png',name:'Gite du Brillant',place:'Nice',nbRoom:'5',shortDesc:'LE meilleur gite de la région'},

                    addRoom(room);

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


app.controller('searchPanel', function($scope){

    $scope.query_search = function() {

        api_url="http://35.177.136.202";
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        city = document.getElementById("queryPlace");
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

                    if (room.photo == undefined) {
                        room.photo = 'pictures/32477145.png';
                    }

                    $("#searchRes").append('' +
                        '<div class="jumbotron" style="height:250px; padding:10px;">\n' +
                        '    <div class="col-md-3" style="height:100%;">\n' +
                        '        <img src="'+room.photo+'" style="height:100%;">\n' +
                        '    </div>\n' +
                        '    <div class="col-md-9 sResultsText" style="height:100%;">\n' +
                        '        <h3>'+room.establishment.name+'</h3>\n' +
                        '        <p>'+room.establishment.place+'</p>\n' +
                        '        <p>'+1+'</p>\n' +
                        '        <p>'+'short description'+'</p>\n' +
                        '    </div>\n' +
                        '    <div>\n' +
                        '        <a href="#/locationPage">test page</a>\n' +
                        '    </div>\n' +
                        '</div>'
                    )

                    /*
                    house = {
                        photo: room.photo,
                        name: room.establishment.name,
                        place: room.establishment.place,
                        nbRoom: '1',
                        shortDesc: ''
                    };

                    // a supprimer ?
                    bddHouses = [];
                    */

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


app.controller('mainController', ['$scope','modalService',function ($scope,modalService, $uibModal,$uibModalStack) {
    $scope.open = function(url, controller) {console.log(modalService.openModal);
        $scope.modal=modalService.openModal(url, controller);
    };
    //utiliser un rootscope pour recuperer le modale
    //pas le meme scope
   /* $scope.close = function() {console.log($rootScope.modal);
        $rootScope.modal.close();
        console.log("dans close ");
    };*/
    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    };
}]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'home.html'
        })
        .when('/searchResults', {
            templateUrl : 'searchResults.html'
        })
        .when('/profilePage', {
            templateUrl : 'profilePage.html'
        })
        .when('/locationPage', {
            templateUrl : 'locationPage.html'
        })
        .otherwise({
            templateUrl : '404.html'
        })

});

// to close thepopups

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