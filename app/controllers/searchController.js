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
        app.post('/search', filters.authorize,  this.search);     
    };


    SearchController.prototype.search= function(req, res) {    

        var searchString = req.body.searchString;
        var that= this;
            
        searchDAL.multiTermSearch(searchString, function (oeuvres, hitmap) {

            if(oeuvres){
                res.render('search/index', { 'oeuvres': oeuvres, 'prevSearch': searchString });
            } else {
                req.flash('flash', 'aucun resultat');
                res.redirect("/");
            } 
        });
    
          
    }; 

    

    module.exports = SearchController;
})();