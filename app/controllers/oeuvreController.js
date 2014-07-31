

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
    function OeuvreController(app) {
        this.routes(app);
    }


    /**
    * oeuvreController routes.
    * @param {app} - express app.
    */
    OeuvreController.prototype.routes = function(app) {


        //inventaire

        app.get('/oeuvre', filters.authorize,  this.index);
        app.get('/oeuvre/list',  filters.authorize, this.index);
        app.get('/oeuvre/show/:id', filters.authorize,  this.show);

        // CRUD
        app.get('/oeuvre/new', filters.authorize, this.new);
        app.post('/oeuvre/create', filters.authorize, this.create);
        app.post('/oeuvre/update', filters.authorize, this.update);
        //app.get('/oeuvre/delete/:id',  this.delete);
        //app.post('/oeuvre/delete',  this.destroy);

        // verrou
        app.get('/oeuvre/verrouiller/:id', filters.authorize, this.verrouillage);
    };

    /**
    * [httpget]
    * OeuvreController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    OeuvreController.prototype.index = function(req, res) {
            
        oeuvreDAL.getAll(function (oeuvres) {
            res.render('oeuvre/index', { 'oeuvres': oeuvres });
        });
          

    };


    OeuvreController.prototype.verrouillage = function(req, res){

        var oeuvreId = req.params.id;
        oeuvreDAL.verrouillage(oeuvreId, function(oeuvreId){
            req.flash('flash', 'Oeuvre verrouillé.');
            res.redirect('/oeuvre/show/'+oeuvreId);
        });

    }

    /**
    * [httpget]
    * OeuvreController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    OeuvreController.prototype.show = function(req, res) {
        
           var oeuvreId = req.params.id;
            oeuvreDAL.get(oeuvreId, function (oeuvre) {
                res.render('oeuvre/show', { 'oeuvre': oeuvre });
            });
    };
    /**
    * [httpget]
    * OeuvreController edit action.
    * @param {req} http request.
    * @param {res} http response.
    *
    * @Deprecated
    *
    OeuvreController.prototype.edit = function(req, res) {
      
            var oeuvreId = req.params.id;
             oeuvreDAL.get(oeuvreId, function (oeuvre) {
                res.render('oeuvre/edit', { 'oeuvre': oeuvre });
            });
        
    };
    */
    /**
    * [httppost]
    * OeuvreController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    OeuvreController.prototype.update = function(req, res) {
        var oeuvre = req.body.oeuvre;
        var id = req.body.oeuvre.id;
        
        console.log("#################################################################");
        console.log("# update oeuvre: "+req.body.oeuvre.oeuvreId);

        console.log("# date acq: "+oeuvre.dateAcquisition);
        console.log("# date inscription in: "+oeuvre.dateInscriptionInventaire);

        oeuvre.dateAcquisition = new Date(oeuvre.dateAcquisition.year, 
            oeuvre.dateAcquisition.month, 
            oeuvre.dateAcquisition.day);
        
        oeuvre.dateInscriptionInventaire = new Date(oeuvre.dateInscriptionInventaire.year, 
            oeuvre.dateInscriptionInventaire.month, 
            oeuvre.dateInscriptionInventaire.day); 

        console.log("# date acq post traitement: "+oeuvre.dateAcquisition);
        console.log("# date inscription inv post traitement: "+oeuvre.dateInscriptionInventaire);
        console.log("###################################################################");
        //console.log("Oeuvre recu pour modifiaction: "+JSON.stringify(oeuvre));

        oeuvreDAL.get(oeuvre.id, function(entity){
            
            if(entity){
                oeuvreDAL.update(entity, oeuvre, function (oeuvre) {
                    //console.log("Oeuvre sauvegardé: "+JSON.stringify(oeuvre));
                    req.flash('flash', 'Modifications enregistré.');
                    res.redirect('/oeuvre/show/'+oeuvre.id);
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * oeuvreController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    OeuvreController.prototype.new = function(req, res) {
        res.render('oeuvre/create');  
    };

    /**
    * [httppost]
    * oeuvreController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    OeuvreController.prototype.create = function(req, res) {
        var oeuvre = req.body.oeuvre;
        
        oeuvre.dateAcquisition = new Date(oeuvre.dateAcquisition.year, 
            oeuvre.dateAcquisition.month, 
            oeuvre.dateAcquisition.day);
        
        oeuvre.dateInscriptionInventaire = new Date(oeuvre.dateInscriptionInventaire.year, 
            oeuvre.dateInscriptionInventaire.month, 
            oeuvre.dateInscriptionInventaire.day);


        
        
        oeuvreDAL.save(oeuvre, function (data) {
            res.redirect('/');
        });
    };

    /**
    * [httpget]
    * OeuvreController delete action.
    * @param {req} http request.
    * @param {res} http response.
    *
    OeuvreController.prototype.delete = function(req, res) {
        var oeuvreId = req.params.id;
        oeuvreDAL.get(oeuvreId, function (oeuvre) {
            res.render('oeuvre/delete', { 'oeuvre': oeuvre });
        });
    };
    */
    /**
    * [httppost]
    * OeuvreController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    *
    OeuvreController.prototype.destroy = function(req, res) {
        // Thomas Bouvos Alias bou-bou est Mort à Pékin le 14 juillet paix à son âme.
        var oeuvre = req.body.oeuvre;
        oeuvreDAL.remove(oeuvre.id, function (data) {
            res.redirect('/oeuvre');
        });
    };
    */
    module.exports = OeuvreController;
})();