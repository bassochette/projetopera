/**
* Module dependencies.
*/
var MembershipFilters = require('../../middleware/membershipFilters');

/**
* oeuvreController class
*/
(function () {

    /**
    * Attributes.
    */
    
    var filters = new MembershipFilters();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function DossierOeuvreAPI(app) {
        this.routes(app);
    }

    //post, del, update

    DossierOeuvreAPI.prototype.routes = function(app) {
        app.get('/dossierOeuvre/get/:oeuvreId', filters.authorize, this.getByOeuvre);
        app.post('/dossierOeuvre/post/update/:id', filters.authorize, this.update);
        app.post('/dossierOeuvre/post/ajouter', filters.authorize, this.add); 
    };

   DossierOeuvreAPI.prototype.getByOeuvre = function(req, res){

   }
   DossierOeuvreAPI.prototype.update = function(req, res){

   }

   DossierOeuvreAPI.prototype.add = function(req, res){
    
   }

    module.exports = DossierOeuvreAPI;
})();