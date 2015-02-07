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
    function SearchAPI(app) {
        this.routes(app);
    }


    SearchAPI.prototype.routes = function(app) {
        // app.post('/searchAPI/search', filters.authorize,  this.search);    
        app.post('/searchAPI/search',  this.search);     

        // route v0.1.0
        app.get("/api/search", this.undef); // TODO
    };

    SearchAPI.prototype.undef = function(){
        return {"message":"unhandled route"};
    };


    SearchAPI.prototype.search= function(req, res) {    

        var searchString = req.body.searchString;
        //console.log("req.body :"+JSON.stringify(req.body));
        var that= this;
            
        searchDAL.multiTermSearch(searchString, function (oeuvres, hitmap) {
          
                res.send(oeuvres)
          
            
        });
        
    
          
    }; 

    

    module.exports = SearchAPI;
})();