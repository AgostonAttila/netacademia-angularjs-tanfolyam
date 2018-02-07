// Form kezelő modul.
var formModule = angular.module("formModule",[]);

// Form group direvtiva

formModule.directive("formGroup", function () {

    //Name generálása
    function generateName(label) {
        return label.replace(/[ \.\-]/g, "").toLowerCase;

    };

    return {
        restrict: "AE", //A Attributum E Element és lehet AE   
        template: "templates/form-group.html", //"<div>Ez egy direktíva</div>"
        scope: {
            "label": "@label",
            "id": "@id",
            "type": "@type",
            "options": "=options",  //nem a nevét veszi át hanem a változót
            "ngModel": "=ngModel"            
        },
        link: function (scope) {
            // scope.label = "Email adress";
         
            scope.modelChanged = function(model){                 
                scope.ngModel = model;
            };
            
            scope.model ="";

            //Egyedi id generálása
            scope.id = scope.id || "form-group" + parseInt(Math.random() * 1000000);

            //Type
            scope.type = scope.type || "text";

            //Name
            scope.name = scope.name || generateName(scope.label);

            //Input fajta beállítása
            scope.input_type = "input";

            //Select beállítása
            if (scope.type === "select") {
                scope.input_type = scope.type;
                scope.options = scope.options ||[
                    {
                        "value": 1,
                        "label": "igen"
                    },
                    {
                        "value": 2,
                        "label": "nem"
                    }
                ];
            }
        }
    };
});