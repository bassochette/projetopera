(function(){

	var oeuvre = angular.module('oeuvre', [
            'oeuvreDirectives'
		]);

	oeuvre.controller('oeuvreCtlr', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){

        this.oeuvre = {

            id: null,

            oeuvreId: "oeuvre id",

            modeAcquisition: "mode acq",

            nomDonnateur: "nom don",

            dateAcquisition: "date acq",

            avisScientifique: "avis scient",

            prix: "prix",

            dateInscriptionInventaire: "",

            designation: "designation",

            marquesInscription: "marque",

            materiaux: "materiaus",

            techniques: "tech",

            mesures: "mesure",

            indicationEtat: "indic",

            auteur: "auteur",

            datation:  "datation",

            fonction: "fonction",

            provenance: "provenance",

            observations: "observation",

            verrou: false


        };
        var that = this;

        if($routeParams.oeuvreId != null){
            console.log("Ceci n'est pas une nouvelle oeuvre.");
        } else {

        }

        this.hasId = function(){

            if(that.oeuvre.id != null){
                return true;
            } else {
                return false;
            }
        };

        this.sauvegarde = function(){
            console.log('Sauvegarde');
            console.log(JSON.stringify(that.oeuvre));

            if(that.oeuvre.id === null){
                //creation oeuvre

                $http.post('/api/oeuvre', that.oeuvre).success(function(data){

                    that.oeuvre = data;
                    $scope.$apply();
                    console.log("oeuvre sauvegardé avec l'id "+that.oeuvre.id);
                });

                // redirection sur la route de detail
            } else {

                //update
                $http.put('/api/oeuvre', that.oeuvre).success(function(data){

                    that.oeuvre = data;
                    $scope.$apply();
                    console.log("Modification sauvegardé ");
                });
            }
        };

        this.sauvegardeEtNouvelle = function(){
            console.log('Sauvegarde et nouvelle');

        };

	}]);

    oeuvre.controller('listeCtlr', ['$http', '$scope',function($http, $scope){

        this.oeuvres = [];

        var deffered = $http.get('/api/oeuvre');

        deffered.then(function(data){
            console.log(data.length+" oeuvres chargé");
            console.log(JSON.stringify("Données retourné par l'api de type "+typeof data+": "));
            this.oeuvres = data;

        });



    }]);



})();