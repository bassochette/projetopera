(function(){

	var app = angular.module("oeuvre", []);

	app.factory("O", function(){
		return {};
	});

	app.controller("oeuvreMenu", [ '$http', function($http){
		$scope.O = O;

		this.save = function(){

			// check oeuvre.id

				//true
					//sauvegarder

				//false
					//ajouter
		};

	}]);

	app.controller("oeuvreFormulaire", function(){

		$scope.O = O;

		
		this.getOeuvre = function(){

		};


	});

	app.controller("oeuvreTab", function(){

	});


})();