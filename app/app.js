var app = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap'
]);
var changeBannerContent=false;

serverURL="http://35.177.136.202"

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
    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];
    $scope.addAlert = function(message) {
        $scope.alerts.push({msg: message});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.connexion = function(){
        //creation d'une requete REST
        api_url=serverURL;
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/user";
        Surnom= document.getElementById("Username").value;
        MotDePasse= document.getElementById("Password").value;

        url=url.concat("/"+Surnom+"?password="+MotDePasse);
        console.log(url);
        // on envoie la requete
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                alert("vous etes bien connecté");
                console.log(myArr);
                // si tout s'est bien passé on change le contenu du banner
                changeBannerContent=true;
                // une fois qu'on a tout fini on ferme la modale
                $uibModalInstance.close('save');
                addAlert('successfull: vous etes bien connectés !');

            }
            else{
                addAlert('erreur !');
                //console.log("error "+this.status+"code2="+this.readyState);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };
});

app.controller("registerController",function($scope,$uibModalInstance){
    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
    $scope.connection = function(){

        //creation d'une requete REST
        api_url=serverURL;
        //    api_url="http://localhost:8080";
        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/user";
        Nom= document.getElementById("").value;
        Prenom= document.getElementById("Surnom").value;
        Surnom= document.getElementById("Surnom").value;
        MotDePasse= document.getElementById("Password").value;
        ConfirmeMDP=document.getElementById("ConfirmPassword").value;
        //tester si les deux mot de passes sont identiques sinon
        url=url.concat("/"+Surnom+"?password="+MotDePasse);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                alert("vous etes bien connecté");
                console.log(myArr);
                // si tout s'est bien passé on change le contenu du banner
                changeBannerContent=true;
                // une fois qu'on a tout fini on ferme la modale
                $uibModalInstance.close('save');
            }
            else{
                alert("error "+this.status);
            }
        };
        // on envoie la requete
        xmlhttp.open("GET", url, true);
        xmlhttp.send();


    };
});

app.controller('ChangeBannerContent', function($scope){
   if(changeBannerContent==true){
       document.getElementById("loginButton").style.visibility = "hidden";
       document.getElementById("userD").style.visibility = "display";

   }
   else {

   }
});

app.controller('locationPage', function($scope){
    $scope.bddHouses = [
        {photo:'32477145.png',name:'Gite du Brillant',place:'Nice',nbRoom:'5',shortDesc:'LE meilleur gite de la région'},
        ]
});

app.controller('searchPanel', function($scope){

    $scope.query_search = function() {
      /*
        function addRoom(room) {

            if (est.photo == undefined) {
                est.photo = 'pictures/32477145.png';
            }

            $("#searchRes").append('' +
                '<div class="jumbotron" ng-controller="locationController" style="height:250px; padding:10px;">\n' +
                '    <div class="col-md-3" style="height:100%;">\n' +
                '        <img src="'+est.photo+'" style="height:75%;">\n' +
                '        <p style="height:25%; margin:0px;">Note de l\'appart</p>\n' +
                '    </div>\n' +
                '    <div class="col-md-6 sResultsText" style="height:100%;">\n' +
                '        <p style="height:25%; margin:0px; vertical-align: center">'+est.establishment.name+'</p>\n' +
                '        <p style="height:25%; margin:0px;">'+est.establishment.place+'</p>\n' +
                '        <p style="height:50%; margin:0px;">'+est.establishment.description+'</p>\n' +
                '    </div>\n' +
                '    <div class="col-md-3" style="height:100%;">\n' +
                '        <p style="height:50%; margin:0px; text-align: center;">placeholder pour nombre de places</p>\n' +
                '        <a href="#/locationPage" ng-click=loadDetails('+est.id+') style="height:50%; margin:0px;">Plus de details</a>\n' +
                '    </div>\n' +
                '</div>'
            )
        }
        */

        api_url=serverURL;
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        place = document.getElementById("queryPlace");
        from = document.getElementById("query3");
        to = document.getElementById("query2");
        charToAdd='?';
        if (place.value != "") {
            url = url.concat(charToAdd).concat("city=").concat(place.value);
            charToAdd='&';
        }
        if (from.value != "") {
            url = url.concat(charToAdd).concat("?from=").concat(from.value);
            charToAdd='&';
        }
        if (to.value != "") {
            url = url.concat(charToAdd).concat("?to=").concat(to.value);
            charToAdd='&';
        }

        $("searchRes").html("");
        resItems = [];

        //console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);

                console.log(myArr);
                for (var est of myArr) {
                    $scope.resItems.push(est);
                }

                $scope.$apply();
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    }
});

app.controller('locationController', function ($scope){
    $scope.loadDetails = function(id) {

        console.log("hello");

        api_url="http://35.177.136.202";
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/establishments/24";

        //console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);

                console.log("myObj");

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

app.controller('dates', function ($scope, uibDateParser) {
  /*  $( function() {
        document.getElementById("datepicker1").datepicker({
            format: 'yyyy-mm-dd'
        });

    });
    $( function() {
        document.getElementById("datepicker2").datepicker({
            format: 'yyyy-mm-dd'
        });

    });*/
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

    $scope.resItems=[];
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