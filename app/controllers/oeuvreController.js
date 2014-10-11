

/**
* Module dependencies.
*/
var OeuvreDAL = require('../dal/oeuvreDAL');
var MembershipFilters = require('../../middleware/membershipFilters');
var moment = require('moment');
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
    function OeuvreController(app) {
        this.routes(app);
    }


    /**
    * oeuvreController routes.
    * @param {app} - express app.
    */
    OeuvreController.prototype.routes = function(app) {

        app.get('/oeuvre/:id', filters.authorize,  this.show);
        app.get('/oeuvre', filters.authorize, this.show);

    };

    
    /**
    * [httpget]
    * OeuvreController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    OeuvreController.prototype.show = function(req, res) {
        if(req.params.id) {
            var oeuvreId = req.params.id;
        }
        
        res.render('oeuvre/index', {'id':oeuvreId});
    };
    
    

   
    module.exports = OeuvreController;
})();