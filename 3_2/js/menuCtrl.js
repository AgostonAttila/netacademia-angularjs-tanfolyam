//Menükezelés

routeApp.controller("menuCtrl", ["$scope", "$rootscope", function ($scope, $rootscope) {

    //Ugrás a kiválasztott tartalomra
    $scope.jumpContent = function ($event) {
        var link = $event.target.getAttribute("href").replace("#", "");
        $scope.setActive($event.target);
    };

    //Aktiv menupont beállítása
    $scope.setActive = function (el) {
        angular.element(".navbar-nav li").removeClass("active");
        angular.element(el).parent.addClass("active");
    };


    //Oldalváltás figyelése
    $scope.$on("$routeChangeSucces", function (ev, to, from) {
        if (from) {
            console.log("innen jöttünk ",
                from.$$route.originalPath);
        }
        console.log("itt vagyunk ",
            to.$$route.originalPath);
    });

}]);