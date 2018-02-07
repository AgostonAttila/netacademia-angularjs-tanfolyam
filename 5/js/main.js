//Fő angularJS modul

var crudModule = angular.module("crudModule", []);

//Konfigurációs fázis
crudModule.config(["$provider", function ($provide) {


    //A log működésének módosítása 
    provide.decorator("$log", ["$delegate", function ($delegate) {
        $delegate.log = function (message) {
            console.log("Mindig eza  log!!!")
        };
        return $delegate;
    }]);
}]);



crudModule.value("messageProvider", function (message) {
    alert(message);
});

//Konstans a beállítások tárolására
crudModule.constant("Config", {
    baseUrl: "http://127.0.0.1:3333"
});




//crud alkalmazás kontrollálása
crudModule.controller("crudCtrl", ["$scope", "crduFactory", "messageProvider", function ($scope, crudFactory, messageProvider) {

    //Felhasználók
    $scope.users = [];

    messageProvider("A kontroller betöltődött");
    //constant nem lehet dekorálni 
    //decorator

    //Választható adattáblák
    $scope.tables = ["user", "order", "product"];
    $scope.selectedTable = "";

    //Adatok lekérése
    $scope.getAllUser = function () {
        crudFactory.read("user", all)
            .then(function (d) {
                $scope.users = d.data;

            }, function (err) {
                console.log("Error: ", err);
            });

    };


    //Új adat beszúrása
    $scope.create = function (model) {
        crudFactory.create("user", model)
            .then(function (d) {
                console.log(d);
                $scope.getAllUser()
                $scope.newUser = [];
            }, function (err) {
                console.log("Error: ", err);
            });
    };


    //Adatsor frissítése
    $scope.update = function (model) {
        crudFactory.update("user", model)
            .then(function (d) {
                alert("Az adatok frissültek");
            });
    };


    //Adatsor törlése
    $scope.delete = function (id) {

        if (!confirm("Biztosan törli"))
            return;

        crudFactory.delete("user", id)
            .then(function (d) {
                console.log(d.data);
                $scope.getAllUser();
                if (!$scope.$$phase) $scope.$apply();
            });
    };


    //Inicalizálás ,lekérjük az összes usert.
    $scope.getAllUser();

}]);