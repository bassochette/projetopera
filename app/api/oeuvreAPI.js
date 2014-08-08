/**
* Module dependencies.
*/
var OeuvreDAL = require('../dal/oeuvreDAL');
var MembershipFilters = require('../../middleware/membershipFilters');

/**
* oeuvreController class
*/
(function () {

    /**
    * Attributes.
    */
    var oeuvreDAL = new OeuvreDAL();
    var filters = new MembershipFilters();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function OeuvreAPI(app) {
        this.routes(app);
    }


    OeuvreAPI.prototype.routes = function(app) {
        app.get('/oeuvreAPI', filters.authorize,  this.oeuvres);     
    };


    OeuvreAPI.prototype.oeuvres= function(req, res) {    

        oeuvreDAL.getAll(function(data){
            res.send(data);
        });
    
          
    }; 

    

    module.exports = OeuvreAPI;
})();