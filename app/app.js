var app = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap'
]);


serverURL = "http://35.177.136.202"

app.service('modalService', function ($uibModal, $uibModalStack) {
    var modalService = {};
    modalService.openModal = function (url, controller) {
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


app.controller("connexionController", function ($scope, $uibModalInstance, $rootScope, $http) {
    /* $scope.deconnecter=function(){
         $rootScope.rootScopeAuthentified=false;
         console.log("I am here");
     }
 */
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };

    $scope.connexion = function () {
        //creation d'une requete REST
        api_url = serverURL;

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/user";
        Surnom = document.getElementById("Username").value;
        MotDePasse = document.getElementById("Password").value;

        url = url.concat("/" + Surnom + "?password=" + MotDePasse);
        console.log(url);
        // on envoie la requete
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                console.log(myArr);
                // si tout s'est bien passé on change le contenu du banner
                $rootScope.rootScopeAuthentified = true;
                $scope.username = myArr.Surnom;
                $scope.email = myArr.email;
                $uibModalInstance.close('save');

            }
            else {
                $rootScope.$rootScopeConnexionErreur = true;
                //afficher un span en rouge ! pour erreur
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

    $scope.register = function () {

        //creation d'une requete REST
        api_url = serverURL;
        var url = api_url + "/api/user/register";

        Surnom = document.getElementById("Surnom").value;
        MotDePasse = document.getElementById("Password").value;
        ConfirmeMDP = document.getElementById("ConfirmPassword").value;
        email = document.getElementById("Email").value;
        $scope.surnom = Surnom;
        $scope.email = email;
        $scope.mdp = MotDePasse;
        $http.post(url, {"username": Surnom, "password": MotDePasse, "email": email})
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    $scope.registrationSuccess = true;
                   // $uibModalInstance.close('save');
                }
                else {
                    $scope.registrationError = true;
                }
            });

    };
});

app.controller('locationPage', function ($scope) {
    $scope.bddHouses = [
        {
            photo: '32477145.png',
            name: 'Gite du Brillant',
            place: 'Nice',
            nbRoom: '5',
            shortDesc: 'LE meilleur gite de la région'
        },
    ]
});

app.factory('selectedEst', function () {
    var selectedEst;

    function set(Est) {
        selectedEst = Est;
    }

    function get() {
        return selectedEst;
    }

    return {
        set: set,
        get: get
    }
});

app.controller('searchPanel', function ($scope, selectedEst) {

    $scope.query_search = function () {

        api_url = serverURL;
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        place = document.getElementById("queryPlace");
        from = document.getElementById("query3");
        to = document.getElementById("query2");
        charToAdd = '?';
        if (place.value != "") {
            url = url.concat(charToAdd).concat("place=").concat(place.value);
            charToAdd = '&';
        }
        if (from.value != "") {
            url = url.concat(charToAdd).concat("?from=").concat(from.value);
            charToAdd = '&';
        }
        if (to.value != "") {
            url = url.concat(charToAdd).concat("?to=").concat(to.value);
            charToAdd = '&';
        }

        //console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);

                //console.log("contenue du tableau");console.log($scope.resItems);

                tabsize = $scope.resItems.length
                for (i = 0; i < tabsize; i++) {
                    $scope.resItems.pop();
                }

                //console.log("contenue du tableau après réinitialisation");console.log($scope.resItems);

                for (var est of myArr) {

                    if (est.photo == undefined) {
                        est.photo = 'pictures/32477145.png';
                    }

                    $scope.resItems.push(est);
                }
                $scope.$apply();
                //console.log(myArr);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    $scope.selectEst = function (Object) {
        selectedEst.set(Object);
    }
});

app.controller('locationController', function ($scope, selectedEst) {
    $scope.rooms = [];

    $scope.loadDetails = function () {

        //console.log("hello");

        $scope.myEst = selectedEst.get();

        //console.log($scope.myEst);

        api_url = serverURL;

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/rooms/";
        //http://35.177.136.202/api/establishments/1

        console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);

                for (room of myObj) {
                    if (room.establishment.id == $scope.myEst.id) {
                        $scope.rooms.push(room);
                    }
                }

                $scope.$apply();

                console.log($scope.rooms);
            }
        }
        ;

        xmlhttp.open("GET", url, true);
        xmlhttp.send();


    }
});


app.controller('dates', function ($scope, uibDateParser) {

    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();

});


app.controller('mainController', ['$scope', '$rootScope', 'modalService', function ($scope, $rootScope, modalService) {
    $scope.open = function (url, controller) {
        modalService.openModal(url, controller);
    };
    $scope.deconnecter = function () {
        $rootScope.rootScopeAuthentified = false;
        console.log("I am here");
    }

    $scope.openNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
    $scope.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    };

    $scope.resItems = [];

}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        })
        .when('/searchResults', {
            templateUrl: 'searchResults.html'
        })
        .when('/profilePage', {
            templateUrl: 'profilePage.html'
        })
        .when('/locationPage', {
            templateUrl: 'locationPage.html'
        })
        .otherwise({
            templateUrl: '404.html'
        })
    ;
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