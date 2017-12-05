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


app.controller("connexionController", function($scope, $uibModalInstance){
    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
    $scope.connexion = function(){
        //creation d'une requete REST
        api_url="http://35.177.54.53";
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        Surnom= document.getElementById("Username").value;
        MotDePasse= document.getElementById("Password").value;

        url=url.concat("?surnom="+Surnom+"&MDP="+MotDePasse);
        console.log(url);
        // on envoie la requete
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        $uibModalInstance.close('save');
    };
});

app.controller("registerController",function($scope,$uibModalInstance){
    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
    $scope.connection = function(){
        //creation d'une requete REST
        api_url="http://35.177.54.53";
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        Nom = document.getElementById("Nom").value;
        Prenom= document.getElementById("Prenom").value;
        Surnom= document.getElementById("Surnom").value;
        MotDePasse= document.getElementById("Password").value;
        ConfirmeMDP=document.getElementById("ConfirmPassword").value;
        //tester si les deux mot de passes sont identiques sinon
        url=url.concat("?nom="+Nom+"&prenom="+Prenom+"&surnom="+Surnom+"&MDP="+MotDePasse);
        console.log(url);
        // on envoie la requete
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        // une fois qu'on a tout fini on ferme la modale
        $uibModalInstance.close('save');

    };
});

app.controller('ChangeBannerContent', function($scope){

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
                '<div class="jumbotron" ng-controller="locationController" style="height:250px; padding:10px;">\n' +
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
                '        <a href="#/locationPage" ng-click=loadDetails("'+room.id+'")>Plus de details</a>\n' +
                '    </div>\n' +
                '</div>'
            )
        }


        api_url="http://35.177.136.202";
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        place = document.getElementById("query");
        from = document.getElementById("query");
        to = document.getElementById("query");
        if (place.value != "") {
            url = url.concat("?city=").concat(place.value);
        }
        if (from.value != "") {
            url = url.concat("?datepicker1=").concat(from.value);
        }
        if (to.value != "") {
            url = url.concat("?datepicker2=").concat(to.value);
        }
        //console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);

                $("#searchRes").html("");

                console.log(myArr);
                for (var room of myArr) {

                    addRoom(room);
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    }
});

app.controller('locationController', function ($scope){
    $scope.loadDetails = function(id) {

        api_url="http://35.177.136.202";
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search?id="+id;

        //console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);

                $("#locationDetails").append('' +
                    '<div class="col-md-4" style="height:100%;">' +
                    '   <img src="pictures/32477145.png" style="height:100%;">' +
                    '</div>' +
                    '<div class="col-md-8 sResultsText" style="height:100%;">' +
                    '   <h3>'+ myObj.name+'</h3>' +
                    '   <p>Lieu</p>' +
                    '   <p>Nombre de chambres</p>' +
                    '   <p>Nom de la chambre ou numéro :</p>' +
                    '   <ul>' +
                    '       <li>numéro x</li>' +
                    '       <li>numéro x+1</li>' +
                    '       <li>numéro (x/2)²+(y/2)²</li>' +
                    '   </ul>' +
                    '   <p>Dates de disponibilités :</p>' +
                    '   <ul>' +
                    '       <li>JJ/MM/AAAA</li>' +
                    '       <li>JJ/MM/AAAA</li>' +
                    '   </ul>' +
                    '   <p>Description :</p>' +
                    '   <div class="jumbotron">'+ +'</div>' +
                    '</div>' +
                    '<div>toast</div>'
                )
                }
            }
        ;

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
})

app.controller('dateController', function ($scope, uibDateParser) {
    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();
});


app.controller('mainController', ['$scope','modalService',function ($scope,modalService) {
    $scope.open = function(url, controller) {
        modalService.openModal(url, controller);
    };
    //utiliser un rootscope pour recuperer le modale
    //pas le meme scope
    //$scope.close = function() {console.log($rootScope.modal);
    //    $uibModalInstance.close('save');
    //    console.log("dans close ");
    //};

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