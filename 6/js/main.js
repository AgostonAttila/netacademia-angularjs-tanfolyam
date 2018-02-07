//Fő modul

var adminApp = angular.module("adminApp", ["ngRoute"]);

//Config

adminApp.config(["routeProvider", function ($routeProvider) {


    //oldalak
    $routeProvider.otherwise({
            "templateUrl": "templates/index.html",
            "controller": "indexCtrl"
        })
        .when("/tables", {
            "templateUrl": "templates/tables.html",
            "controller": "tablesCtrl"
        });

}]);