/*
Create-> Put
Read->Get
Update->Post
Delete->Delete
*/


crudModule.factory("crudFactory", ["$http", "$q", "$log", "Config", function ($http, $q, $log, Config) {

    //Segédfüggvények.
    $log.log(Config);

    //Factory
    return {

        //Alap URL
        baseUrl: Config.baseUrl,

        //Adatok lekérése/olvasása

        read: function (model, id) {

            var deffered = $q.defer;

            //$http kérés indítása
            $http.get(this.baseUrl + "/" + model + "/" + id)
                .then(function (d) {
                    console.log("read válasza:", d);
                    deferred.resolve(d);
                }, function (err) {
                    deferred.reject(err);
                });

            return deffered.promise;
        },
        //Adatok beszúrása/létrehozása
        create: function (model, data) {
            console.log("create:", arguments);

            var deffered = $q.defer;

            //$http kérés indítása
            $http.put(this.baseUrl + "/" + model, data)
                .then(function (d) {
                    deferred.resolve(d);
                }, function (err) {
                    deferred.reject(err);
                });

            return deffered.promise;
        },
        //Adatok frissítése/módosítása
        update: function (model, data) {
            console.log("update:", arguments);

            var deffered = $q.defer;

            //$http kérés indítása
            $http.post(this.baseUrl + "/" + model, data)
                .then(function (d) {
                    deferred.resolve(d);
                }, function (err) {
                    deferred.reject(err);
                });

            return deffered.promise;
        },
        //Adatok törlése
        delete: function (model, id, data) {
            console.log("delete:", arguments);

            var deffered = $q.defer;

            //$http kérés indítása
            $http.delete(this.baseUrl + "/" + model + "/" + id)
                .then(function (d) {
                    deferred.resolve(d);
                }, function (err) {
                    deferred.reject(err);
                });

            return deffered.promise;
        }





    };


}]);