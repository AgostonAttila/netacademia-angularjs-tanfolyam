//Tartalmak kezelése
nap2.controller("contentCtrl", ["$http", "$scope", "$rootScope", function ($http, $scope, $rootScope) {

    //Bemutatkozó kép
    $scope.aboutImg = "http://www.socialmediaexaminer.com/wp-content/uploads/2015/06/ar-team-shutterstock-136370609.jpg";


    //Alapértelmezett sablon
    $scope.contentTemplate = "content";


    //Template dinamikus betöltése    
    $scope.getTemplate = function (name) {
        return "templates/" + $scope.contentTemplate + ".html"
    };

    //Menükattintások figyelése
    $rootScope.$on("change_url", function (ev, data) {
        $scope.contentTemplate = data;
        $scope.getTemplate();
    });

    //Contact űrlap adatai
    $scope.user = {};

    $scope.needs = ["email", "name", "password"];
    //Űrlap ellnőrzése
    $scope.checkForm = function ($event) {

        if (angular.element($event.target).hasClass("ng-invalid")) {
            $event.preventDefault();
            alert("Kérem javítsa a piros mezőket!!!!");
        }

        /*
        //Adatok meglétének ellenőrzése
        for(var k in $scope.needs){
            if(!$scope.user[$scope.needs[k]]){
                alert("Nem töltöte ki a " +$scope.needs[k]+" mezőt!!!");
                 $event.preventDefault();
                return;
            }           
        }
        
        //Email ellnőrzése
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if(!regex.test($scope.user.email)){
            alert("Nem megfelelő email!!!!");
             $event.preventDefault();
            return;
        } 
        */
    };


    //Csapat tagjai

    $scope.csapat = [
        {
            "name": "Kiss Balázs",
            "email": "kissbalazs@gmail.com"
        },
        {
            "name": "Kiss Jenő",
            "email": "kissbalazs@gmail.com"
        },
        {
            "name": "Kiss Janka",
            "email": "kissbalazs@gmail.com"
        },
        {
            "name": "Kiss Géza",
            "email": "kissbalazs@gmail.com"
        },
        {
            "name": "Janesz Balázs",
            "email": "kissbalazs@gmail.com"
        },
        {
            "name": "Nagy Balázs",
            "email": "kissbalazs@gmail.com"
        }
    ];


}]);