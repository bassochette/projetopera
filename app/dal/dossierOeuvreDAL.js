/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* dossierOeuvreDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function dossierOeuvreDAL() {
		
    }
 
	

    dossierOeuvreDAL.prototype.getByOeuvreId = function(oid, next){

        //console.log('######################################################');
        //console.log('[dossierOeuvreDAL][getByOeuvreId] call');
        dbContext.dossierOeuvre.findAll({ where: {oeuvreId: oid} }).success(function(data){
           
            // console.log('-#-#-#-#-#-#-#-#-#-#-#-#-#-');
            // console.log('[dossierOeuvreDAL][getByOeuvreId] sucess query '+data.length+': '+JSON.stringify(data));
            // console.log('-#-#-#-#-#-#-#-#-#-#-#-#-#-');

            var toDo = data.length;
            var result = [];

            data.forEach(function(dossier, idx, r){
                
                // console.log('[#----------------------------#]');
                // console.log('[dossierOeuvreDAL][getByOeuvreId] debut traitement '+idx);
                

                var item = dossier;

                console.log('item '+idx+': '+JSON.stringify(item));
                // console.log('[#----------------------------#]');

                item.champsId ? null : item.champsId = 1 ;

                dbContext.champs.find({where: {id: dossier.champsId}}).success(function(d){

                    // console.log('----------------------------');
                    // console.log('returned: '+JSON.stringify(d));
                    // console.log('item '+idx+': '+JSON.stringify(item));
                 
                    var itemToReturn = {};
                    itemToReturn.id = item.id;
                    itemToReturn.champsId = item.champsId;
                    itemToReturn.valeur = item.valeur;
                    itemToReturn.oeuvreId = item.oeuvreId;
                    itemToReturn.nom = d.nom;
                    itemToReturn.type = d.type;

                    // console.log('item post traitement '+idx+': '+JSON.stringify(itemToReturn));

                    // console.log('[dossierOeuvreDAL][getByOeuvreId] pushing :'+JSON.stringify(itemToReturn));
                    

                    result.push(itemToReturn);
                    // console.log('result.length : '+result.length);
                    // console.log('toDo :'+toDo);
                    if(result.length === toDo){
                        // console.log('next!');
                        // console.log('-------------------------------');
                        next(result);
                    }
                    
                    // console.log('-------------------------------');

                }).error(function(err){
                    console.log('[dossierOeuvreDAL][getByOeuvreId] error '+JSON.stringify(err));
                    item.nom = "erreur";
                    item.type = "erreur";
                    result.push(item);
                    // console.log('[dossierOeuvreDAL][getByOeuvreId] pushing :'+JSON.stringify(item));
                    if(result.length === toDo){
                        next(result);
                    }
                }); 
            });


        }).error(function(err){
            console.log('[dossierOeuvreDAL][getByOeuvreId] Fail query 1'+JSON.stringify(err));
            next({message: err});
        });

        /*
        dbContext.query().success(function(result){
            callback(result);
        });
        */
    };

   
    /**
     * save dossierOeuvre
     * @param  {Object}   dossierOeuvre
     * @param  {Function} callback
     */
    dossierOeuvreDAL.prototype.save = function(dossierOeuvre, next) {

        var dossierOeuvre = dbContext.dossierOeuvre.build(dossierOeuvre);

        dossierOeuvre.save().success(function(data) {
            next(data);
        }).error(function(err) {
            next({message: err});
        });
    };

    /**
     * edit a dossierOeuvre
     * @param  {Object}   dossierOeuvre
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    dossierOeuvreDAL.prototype.updateValById = function(id, attributes, callback){
        
        var dossierOeuvre = {};
        dbContext.dossierOeuvre.find({where : {id: id}}).success(function(data){

            data.updateAttributes(attributes).success(function (updatedDossierOeuvre) { 
                callback(updatedDossierOeuvre);
            }); 
        }).error(function(err){
            callback({message: err});
        });

   
    };

    /**
     * delete an dossierOeuvre
     * @param  {Integer}   dossierOeuvreId
     * @param  {Function} callback
     */
    dossierOeuvreDAL.prototype.remove = function(dossierOeuvreId, callback) {   
        dbContext.dossierOeuvre.find(dossierOeuvreId).success(function(dossierOeuvre) {
			dossierOeuvre.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = dossierOeuvreDAL;
})();