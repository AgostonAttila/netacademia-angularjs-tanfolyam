//Szerver kommunikáció kezelése

routeApp.factory("serverFactory", ["$http", "$q", function ($http, $q) {

    return {
        //Adatok lekérése
        getData: function () {
            //Új $q példány
            var deffered = $q.defer;

            //Lekérjuk az adatokat 
            $http.get("json/products.json")
                .then(function (d) {
                    deffered.resolve(d.data);

                    //d.data;

                    //$scope.products = d.data;
                    //$scope.getProduct();

                }, function (err) {
                    deffered.reject(err);
                    //console.error("Error in request: ", error);
                });

            //Visszatérünk
            return deffered.promise;

        },

        //Adatok elküldése
        postData: function (data) {
            var deffered = $q.defer;

            $http.post("http://127.0.0.1:3333", $scope.products)
                .then(function (d) {
                    deffered.resolve(data);
                }, , function (err) {
                    deffered.reject(err);
                    //console.error("Error in request: ", error);
                });
            return deffered.promise;
        }


    };
}]);