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


app.controller("RegisterController", function ($scope, $uibModalInstance, $rootScope, $http) {

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };

    $scope.register = function () {

        //creation d'une requete REST
        api_url = serverURL;
        var url = api_url + "/api/user/register";
        $scope.ErrorMDP = false;
        $scope.registrationError=false;
        $scope.ServerError=false;
        Surnom = document.getElementById("Surnom").value;
        MotDePasse = document.getElementById("Password").value;
        ConfirmeMDP = document.getElementById("ConfirmPassword").value;
        email = document.getElementById("Email").value;
        $scope.surnom = Surnom;
        if (MotDePasse != ConfirmeMDP) {
            $scope.ErrorMDP = true;
        }
        else {
            $http.post(url, {"username": Surnom, "password": MotDePasse, "email": email})
                .then(function (response) {
                    $scope.registrationSuccess = true;
                })
                .catch(function (err) {
                    if(err.status<200){
                        $scope.ServerError=true;
                    }
                    if(err.status>300){
                        $scope.registrationError=true;
                    }

                });
        }
    };
});
app.controller("connexionController", function ($scope, $uibModalInstance, $rootScope, $http) {

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };
    $scope.connexion = function () {
        //creation d'une requete REST
        api_url = serverURL;
        $scope.connexionErreur = false;
        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/user";
        $rootScope.surnom = document.getElementById("Username").value;
        MotDePasse = document.getElementById("Password").value;

        url = url.concat("/" + $rootScope.surnom + "?password=" + MotDePasse);
        console.log(url);
        // on envoie la requete

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                console.log(myArr);
                // si tout s'est bien passé on change le contenu du banner
                $rootScope.rootScopeAuthentified = true;
                $rootScope.email = myArr.email;
                $uibModalInstance.close('save');

            }
            else {
                if(this.status!=200){
                    $scope.connexionErreur = true;
                    console.log("error_connexion");
                }
                //afficher un span en rouge ! pour erreur
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    };

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

app.factory('duration', function () {
    var duration;

    function set(dur) {
        duration = dur;
    }

    function get() {
        return duration;
    }

    return {
        set: set,
        get: get
    }
});


app.factory('selectedDates', function () {
    var startDate;
    var endDate;

    function setStart(start) {
        startDate = start;
        console.log(startDate + "start")
    }

    function setEnd(end) {
        endDate = end;
        console.log(endDate + "end")

    }

    function getStart() {
        return startDate;
    }

    function getEnd() {
        return endDate
    }

    return {
        setStart: setStart,
        getStart: getStart,
        setEnd: setEnd,
        getEnd: getEnd,

    }
});

app.factory('selectedRoom', function () {
    var selectedRoom;

    function set(Room) {
        selectedRoom = Room;
    }

    function get() {
        return selectedRoom;
    }

    return {
        set: set,
        get: get
    }
});

app.controller('searchPanel', function ($scope, selectedEst, selectedDates, duration) {
    $scope.searchLength="";
    $scope.searchValid=true;
    $scope.searchValidation=function (){
        length = document.getElementById("queryLength");
        sizeA = document.getElementById("querySizeA");
        sizeC = document.getElementById("querySizeC");
        console.log(length.value + " " + sizeA.value+" " + sizeC.value);

        if((parseInt(length.value, 10)>0 || length.value==="")&&(parseInt(sizeA.value, 10)>0 || sizeA.value==="")&&(parseInt(sizeC.value, 10)>0 || sizeC.value==="")){
            console.log("cool");

            $scope.searchValid=true;
        }
        else{
            console.log("nul");
            $scope.searchValid=false;

        }
    }
    $scope.query_search = function () {

        api_url = serverURL;
        //    api_url="http://localhost:8080";

        var xmlhttp = new XMLHttpRequest();
        var url = api_url + "/api/search";
        place = document.getElementById("queryPlace");
        from = document.getElementById("query3");
        to = document.getElementById("query2");
        length = document.getElementById("queryLength");
        sizeA = document.getElementById("querySizeA");
        sizeC = document.getElementById("querySizeC");

        charToAdd = '?';
        if (place.value != "") {
            url = url.concat(charToAdd).concat("place=").concat(encodeURIComponent(place.value));
            charToAdd = '&';
        }
        if (from.value != "") {
            var date = new Date(from.value)
            var utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
            url = url.concat(charToAdd).concat("from=").concat(utc);
            charToAdd = '&';
            selectedDates.setStart(from.value);
        }

        if (to.value != "") {
            var date = new Date(to.value)
            var utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
            url = url.concat(charToAdd).concat("to=").concat(utc);
            charToAdd = '&';
            selectedDates.setEnd(to.value);
        }
        if (length.value != "") {
            lengthN = parseInt(length.value, 10);
            if(lengthN!=NaN && lengthN>0) {
                url = url.concat(charToAdd).concat("duration=").concat(lengthN);
                charToAdd = '&';
                duration.set(lengthN);
            }
        }
        if (sizeA.value != "") {
            sizeAN = parseInt(sizeA.value, 10);
            if(sizeAN!=NaN && sizeAN>0) {
                url = url.concat(charToAdd).concat("sizeA=").concat(sizeAN);
                charToAdd = '&';
            }
        }
        if (sizeC.value != "") {
            sizeCN = parseInt(sizeC.value, 10);
            if(sizeCN!=NaN && sizeCN>0){
                url = url.concat(charToAdd).concat("sizeC=").concat(sizeCN);
                charToAdd = '&';

            }
        }

        console.log(url);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);

                //console.log("contenue du tableau");console.log($scope.resItems);

                tabsize = $scope.resItems.length
                for (i = 0; i < tabsize; i++) {
                    $scope.resItems.pop();
                }

                //console.log("contenue du tableau après réinitialisation");console.log($scope.resItems);

                idStored = [];
                for (var est of myArr) {

                    if (est.photo == undefined) {
                        est.photo = 'pictures/32477145.png';
                    }

                    if (!idStored.includes(est.id)) {
                        $scope.resItems.push(est);
                        idStored.push(est.id);
                        console.log(idStored);
                    }
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

app.controller('locationController', function ($scope, selectedEst, selectedRoom, selectedDates, duration) {
    $scope.rooms = [];
    $scope.selectedRoomDetails = [];
    $scope.begin = selectedDates.getStart();
    $scope.end = selectedDates.getEnd();
    $scope.dateValid = false;
    $scope.duration = duration.get();


    $scope.dateContinuity = function () {
        from = document.getElementById("reservationStart");
        to = document.getElementById("reservationEnd");
        length = document.getElementById("queryLength");
        selectedDates.setStart(from.value);
        selectedDates.setEnd(to.value);
        duration.set(length.value);
        console.log(duration.get() +" "+ length.value);

        start = new Date(selectedDates.getStart());
        end = new Date(selectedDates.getEnd());
        if (start <= end && duration.get()>0) {
            $scope.dateValid = true;
            console.log(start + end + $scope.dateValid);

        }
        else {
            duration.set(0);
            $scope.dateValid = false;
            console.log(start + end + $scope.dateValid);
        }

    };

    $scope.loadDetails = function () {
        //console.log("hello");

        $scope.myEst = selectedEst.get();

        console.log($scope.myEst);

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

        start = new Date(selectedDates.getStart());
        end = new Date(selectedDates.getEnd());
        if (start <= end) {
            $scope.dateValid = true;
            console.log(start + end + $scope.dateValid);

        }
        else {
            $scope.dateValid = false;
            console.log(start + end + $scope.dateValid);
        }
    }

    $scope.selectRoom = function (Object) {
        selectedRoom.set(Object);
        from = document.getElementById("reservationStart");
        to = document.getElementById("reservationEnd");
        selectedDates.setStart(from.value);
        selectedDates.setEnd(to.value);
    }

});

app.controller('reservationController', function ($scope, selectedRoom, selectedDates, duration) {

    $scope.startDate;
    $scope.endDate;
    $scope.room;
    $scope.duration;


    $scope.startReservation = function () {
        $scope.startDate = selectedDates.getStart();
        $scope.endDate = selectedDates.getEnd();
        $scope.room = selectedRoom.get();
        $scope.duration = duration.get();

        // Render the PayPal button
        $('https://www.paypalobjects.com/api/checkout.js', function () {
            paypal.Button.render({

                // Set your environment

                env: 'sandbox', // sandbox | production

                // Specify the style of the button

                style: {
                    label: 'paypal',
                    fundingicons: true, // optional
                    branding: true, // optional
                    size: 'medium', // small | medium | large | responsive
                    shape: 'pill',   // pill | rect
                    color: 'silver'   // gold | blue | silver | black
                },

                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create

                client: {
                    sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: '<insert production client id>'
                },

                // Wait for the PayPal button to be clicked

                payment: function (data, actions) {
                    return actions.payment.create({
                        transactions: [
                            {
                                amount: {total: '0.01', currency: 'USD'}
                            }
                        ]
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function (data, actions) {
                    return actions.payment.execute().then(function () {
                        window.alert('Payment Complete!');
                    });
                }

            }, '#paypal-button-container');
        })
    }

});


app.controller('dates', function ($scope, uibDateParser) {

    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();

});


app.controller('mainController', ['$scope', '$rootScope', 'modalService', function ($scope, $rootScope, modalService, $location) {
    $scope.open = function (url, controller) {
        modalService.openModal(url, controller);
    };
    $scope.deconnecter = function () {
        console.log("coucou t es la?");
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
        .when('/home', {
            templateUrl: 'home.html'
        })
        .when('/locationPage', {
            templateUrl: 'locationPage.html'
        })
        .when('/reservationPage', {
            templateUrl: 'reservationPage.html'
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