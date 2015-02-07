(function(){

	var oeuvreController = angular.module('oeuvre', [
		]);

	oeuvreController.controller('oeuvreController', ['$scope', '$routeParams', '$http',function($scope, $routeParams, $http){

		this.oeuvre = {};
		console.log('$routeParams '+JSON.stringify($routeParams));
		if($routeParams.id === 'nouvelle'){

		} else {

			//Appeller l'api pour récupérer les info sur l'oeuvre concerné
		}

	}]);

	oeuvreController.directive('inventaire', function(){
		return {
			restrict: 'E',
			templateUrl: 'inventaire.html'
		};
	});

})();