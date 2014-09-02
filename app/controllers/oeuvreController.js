

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


        //inventaire

        app.get('/oeuvre', filters.authorize,  this.index);
        app.get('/oeuvre/list',  filters.authorize, this.index);
        app.get('/oeuvre/auteur',  filters.authorize, this.listParAuteur);
        //app.get('/oeuvre/date',  filters.authorize, this.index);
        app.get('/oeuvre/nom',  filters.authorize, this.listParNom);
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
            
        oeuvreDAL.getRecentlyUpdated(20, function (oeuvres) {
            res.render('home/index', { 'oeuvres': oeuvres, 'title': 'Inventaire' });
        });
          

    };
    OeuvreController.prototype.listParAuteur = function(req, res) {
            
        oeuvreDAL.getParAuteur(function (oeuvres) {
            res.render('oeuvre/list', { 'oeuvres': oeuvres, 'title': 'Inventaire par Auteur(s)' });
        });
          

    };
    OeuvreController.prototype.listParNom = function(req, res) {
            
        oeuvreDAL.getParNom(function (oeuvres) {
            res.render('oeuvre/list', { 'oeuvres': oeuvres , 'title': 'Inventaire par désignation'});
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
                //oeuvre.dateAcquisition = new Date(oeuvre.dateAcquisition).format("DD/MM/YYYY");

                //oeuvre.dateAcquisition = moment(oeuvre.dateAcquisition);
                //console.log("test moment: "+oeuvre.dateAcquisition);
                var dateAcquisition = new Date(oeuvre.dateAcquisition);
                

                console.log("dateAcquisition: "+dateAcquisition);
                oeuvre.dateAcquisition = dateAcquisition;

                res.render('oeuvre/show', { 'oeuvre': oeuvre });
            });
    };
    
    /**
    * [httppost]
    * OeuvreController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    OeuvreController.prototype.update = function(req, res) {
        var oeuvre = req.body.oeuvre;
        var id = req.body.oeuvre.id;

        console.log("dateInscriptionInventaire: "+oeuvre.dateInscriptionInventaire);
        console.log("dateAcquisition: "+oeuvre.dateAcquisition);

        //oeuvre.dateAcquisition = moment(oeuvre.dateAcquisition).format("X");
        //oeuvre.dateInscriptionInventaire = moment(oeuvre.dateInscriptionInventaire).format("X");

        oeuvreDAL.get(oeuvre.id, function(entity){
            
            if(entity){
                oeuvreDAL.update(entity, oeuvre, function (oeuvre) {
                    //console.log("Oeuvre sauvegardé: "+JSON.stringify(oeuvre));
                    req.flash('flash', 'Modifications enregistrées.');
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
        res.render('oeuvre/show', { oeuvre : {verrou: false}});  
    };

    /**
    * [httppost]
    * oeuvreController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    OeuvreController.prototype.create = function(req, res) {
        var oeuvre = req.body.oeuvre;
        oeuvre.dateAcquisition = new Date(oeuvre.dateAcquisition);
        oeuvre.dateInscriptionInventaire = new Date(oeuvre.dateInscriptionInventaire);
         
        oeuvreDAL.save(oeuvre, function (data) {
            res.redirect('/oeuvre/show/'+data.id);
        });
    };

   
    module.exports = OeuvreController;
})();