var app = angular.module('museion', [
	'ngRoute',
	'oeuvre'
	]);

app.config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl : '/html/home.html',
        controller : 'home'
    })
        .when('/oeuvre/nouvelle', {
            templateUrl:  '/html/oeuvre/show.html',
            controller: 'oeuvreController'
        })
        .when('/oeuvre/:id', {
            templateUrl: '/html/oeuvre/show.html',
            controller: 'oeuvreController'
        })
        .otherwise({
            redirectTo: "/"
        });
}]);