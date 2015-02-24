app.config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		redirectTo: "/oeuvre/nouvelle"
	})
	.when('/oeuvre/nouvelle', {
		templateUrl:  '/html/oeuvre/show.html',
		controller: 'oeuvreCtlr as oCtlr'
	})
	.when('/oeuvre/detail/:id', {
		templateUrl: '/html/oeuvre/show.html',
		controller: 'oeuvreCtlr as oCtlr'
	}).when('/oeuvre/liste', {
            templateUrl: 'html/oeuvre/liste.html',
            controller:'listeCtlr'
        })
	.otherwise({
		redirectTo: "/oeuvre/nouvelle"
	});
}]);