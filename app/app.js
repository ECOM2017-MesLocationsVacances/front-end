var app = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap'
]);


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


app.controller("connexionController", function($scope, $uibModalInstance,$rootScope){

    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };

    $scope.connexion = function(){
        //creation d'une requete REST
        api_url=serverURL;

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
                console.log(myArr);

                // si tout s'est bien passé on change le contenu du banner
                $rootScope.rootScopeAuthentified=true;
                // une fois qu'on a tout fini on ferme la modale

                document.getElementById("Connected").value="Vous etes bien connecté vous allez etre redirrigé\n" +
                    " vers la page d'accueil dans quelques secondes";
                //$timeout($uibModalInstance.close('save'),2000);

            }
            else{
                //afficher un span en rouge ! pour erreur
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
                '        <a href="#/locationPage">Plus de details</a>\n' +
                '    </div>\n' +
                '</div>'
            )
        }


        api_url=serverURL;
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        place = document.getElementById("queryPlace");
        from = document.getElementById("datepicker1");
        to = document.getElementById("datepicker2");
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



app.controller('dates', function ($scope, uibDateParser) {

    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();
});
//ce controlleur permet de modifier le contenu du banner
app.controller('bannerController',function($scope){
    $scope.appDetails={
        //if($rootScope.$rootScopeAuthentified)

    }
});

app.controller('mainController', ['$scope','modalService',function ($scope,modalService) {
    $scope.open = function(url, controller) {
        modalService.openModal(url, controller);
    };
   /* $scope.TestLogin=function(){
        return changeBannerContent;
    }*/

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