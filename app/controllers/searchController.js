/**
* Module dependencies.
*/
var SearchDAL = require('../dal/searchDAL');
var MembershipFilters = require('../../middleware/membershipFilters');

/**
* oeuvreController class
*/
(function () {

    /**
    * Attributes.
    */
    var searchDAL = new SearchDAL();
    var filters = new MembershipFilters();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function SearchController(app) {
        this.routes(app);
    }


    SearchController.prototype.routes = function(app) {
        app.post('/search', filters.authorize,  this.basicSearch);     
    };

    SearchController.prototype.basicSearch= function(req, res) {    

        var searchString = req.body.searchString;
        console.log("searchString: "+searchString);
        var searches = searchString.split(" ");
        console.log(JSON.stringify(searches));

            
        searchDAL.basicSearch(searchString, function (oeuvres) {

            if(oeuvres){
                res.render('oeuvre/index', { 'oeuvres': oeuvres, 'prevSearch': searchString });
            } else {
                req.flash('flash', 'aucun resultat');
                res.redirect("/");
            } 
        });
    
          
    }; 
    module.exports = SearchController;
})();