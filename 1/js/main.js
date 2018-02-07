//Main Module
var mainModule = angular.module("mainModule",[]);

//Test controller
mainModule.controller("testCtrl",["$scope","$http", function($scope,$http){
    
    $scope.yourName ="Jack";
    
    $scope.greeting = function(){
        return "Jófej vagy "+$scope.yourName+"!";
    };
    
    //Watch yourname variable
    $scope.$watch("yourName",function(n,o){
        if(n.indexOf("Brad") !==-1){
            $scope.note ="jó fej";
        }
    });
    
    $scope.clickHandler = function(){
        $scope.myNote ="Ez neked szól: "+ $scope.yourName;
    };
    
}]);

//Form Controller
mainModule.controller("formCtrl",["$scope", function($scope){
    
    //User Object
    $scope.user = {};
    
    $scope.egyenleg =800;
    
    //Watch user objektum
    $scope.watchCollection("user",function(n,o)){
                           
    };
    
}]);