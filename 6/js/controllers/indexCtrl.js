adminApp.controller("indexCtrl", ["$scope", "$http", function ($scope, $http) {


    $scope.dashboard = {};

    //Lekérjük a dashboard adatait
    $http.get("json/dashboard.json")
        .then(function (d) {
            console.log(d);
            $scope.dashboard = d.data;
            $scope.showCnt();
        }, function (err) {
            console.log(err);
        });


    $scope.showCnt = function () {
        $scope.commentCount = $scope.dashboard.comments.length;
        $scope.orderCount = $scope.dashboard.orders.length;
        $scope.ticketCount = $scope.dashboard.tickets.length;
        $scope.taskCount = $scope.dashboard.tasks.length;
    };


}]);