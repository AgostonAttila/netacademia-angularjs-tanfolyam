//Fő modul
var routeApp = angular.module("routeApp", ["ngRoute"]);
routeApp.controller("MainCtrl", ["$scope", "$location", function ($scope, $location) {

}]);

routeApp.controller("indexCtrl", ["$scope", "$location", function ($scope, $location) {

}]);

routeApp.controller("contactCtrl", ["$scope", "$location", function ($scope, $location) {

}]);

routeApp.controller("aboutCtrl", ["$scope", "$location", function ($scope, $location) {

}]);

routeApp.controller("shopCtrl", ["$scope", "$location", function ($scope, $location) {

}]);

//termékek kezelése
routeApp.controller("productCtrl", ["$scope", "$location", "$routeparams", "$http", "serverFactory", function ($scope, $location, $routeparams, $http, serverFactory) {
    $scope.productID = $routeparams.id;

    //termékek
    $scope.products = [];
    $scope.selectedProduct = {};

    //HTTP termékek lekérése
    serverFactory.getData()
        .then(function (d) {
            $scope.products = d;

            if (!$scope.$$phase) $scope.$apply();

            $scope.getProduct();
        });

    //Ki lett factoryba rakva
    /* getData: function(){
          $http.get("json/products.json")
         .then(function (d) {           
             $scope.products = d.data;
             $scope.getProduct();

         }, function (err) {
             console.error("Error in request: ", error);
         }); 
       } */

    //Első ha jól lefut második a hiba


    //Termék keresése id alapján
    $scope.getProduct = function () {
        for (var k in $scope.products) {
            if ($scope.products[k].id = $scope.productID) {
                $scope.selectedProduct = $scope.products[k];
                return;
            }
        }
    };


    //POST termék mentése
    $scope.sendProduct = function ($event) {
        $event.preventDefault();

        //Módósítások érvényesítése
        var index = $scope.products.indexOf($scope.selectedProduct);
        $scope.products[index] = $scope.selectedProduct;

        //1 vezio
        serverFactory.postData($scope.products)
        .then(function(d){
           console.info("Adatok mentve"); 
        });

        //2. callbackes
        /*serverFactory.postData($scope.products,function(d){
            console.info("Adatok mentve"); 
        });*/
                
        
        //3.régi ittvan a fgv
        /* $http.post("http://127.0.0.1:3333", $scope.products)
             .then(function (d) {
                
             });*/
    };

}]);


//Konfig
routeApp.config(function ($routeProvider) {

    //Oldalak listája amik az alkalmazásban vannak
    var pages = ["about", "contact", "shop"];

    //Routing szabályok. automatikus
    $routeProvider
        .otherwise({
            templateUrl: "templates/index.html",
            controller: "indexCtrl"
        });
    //Oldalak dinamikus hozzáadása
    for (var k in pages) {
        $routeProvider
            .when('/' + pages[k], {
                templateUrl: "templates/" + pages[k] + ".html",
                controller: pages[k] + "Ctrl"
            });
    }
    //Termék oldal

    $routeProvider
        .when("/shop/:id", {
            templateUrl: "templates/product.html",
            controller: "productCtrl"
        });



    //Routing szabályok. régi
    /* $routeProvider
         .when('/index', {
             templateUrl: "templates/index.html",
             controller: "indexCtrl"
         })
         .when('/about', {
             templateUrl: "templates/about.html",
             controller: "aboutCtrl"
         })
         .when('/contact', {
             templateUrl: "templates/contact.html",
             controller: "contactCtrl"
         })
         .otherwise({
             templateUrl: "templates/index.html",
             controller: "indexCtrl"
         }) */

});