dmodule.controller("formCtrl", ["$scope", "$rootscope", function ($scope, $rootscope) {

    //Választható nemek listája
    $scope.genders = [
        {
            "value": 1,
            "label": "férfi"
                    },
        {
            "value": 2,
            "label": "nő"
                    },
        {
            "value": 3,
            "label": "nem nyilatkozik"
                    }
                ];
    
    //Űrlap ellenőrzése
    
    $scope.user ={  };
    
    $scope.checkForm =function(){
      //alert("Űrlap ellenőrzése");
        console.log($scope.user);
    };

}]);