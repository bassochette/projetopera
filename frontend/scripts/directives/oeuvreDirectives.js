(function(){
	var oeuvreDirectives = angular.module('oeuvreDirectives', []);

    oeuvreDirectives.directive('inventaire', function(){
        return{
            restrict: 'E',
            templateUrl: '/html/oeuvre/inventaire.html'
        };
    });
})();