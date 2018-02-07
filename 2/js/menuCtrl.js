//Menükezelés

nap2.controller("menuCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {

    //Ugrás a kiválasztott tartalomra
    $scope.jumpContent = function ($event) {
        $event.preventDefault();
        var link = $event.target.getAttribute("href").replace("#", "");
        $rootScope.$broadcast("change_url", link);
        $scope.setActive($event.target);
    };

    //Aktiv menupont beállítása
    $scope.setActive = function (el) {
        angular.element(".navbar-nav li").removeClass("active");
        angular.element(el).parent.addClass("active");
    };

}]);