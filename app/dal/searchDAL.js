/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* UserDal class
*/
(function () {

	/**
	 * Attributes
	 */
	var dbContext = new DbContext();
    var sql = dbContext.db;
    /**
    * Constructor.
    */
    var SearchDal = function () {
        
    }

    SearchDal.prototype.basicSearch = function (searchString, callback) {
        //utiliser un array ou découper la string en plusieurs mot
        console.log("Recherche lancé pour: "+searchString);
        dbContext.oeuvre.findAll({ 
            where :
                sql.or({ designation : {like : '%'+searchString+'%'}},
                { observations : {like : '%'+searchString+'%'}},
                { techniques : {like : '%'+searchString+'%'}},
                { materiaux : {like : '%'+searchString+'%'}},
                { datation : {like : '%'+searchString+'%'}},
                { provenance : {like : '%'+searchString+'%'}},
                { auteur : {like : '%'+searchString+'%'}},
                { oeuvreId : {like : '%'+searchString+'%'}})
            
        }).success(function (result) {
            console.log('Resultat recu pour: '+searchString);
            console.log('hit: '+result.length);
            callback(result);
        }).error(function(err){
            console.log("Erreur pour recherche: "+searchString);
            console.log("err: "+err);
        });

    };

    SearchDal.prototype.multiTermSearch = function(searchTerms, callback){
        
        var results = [];
        var counter = 0;
        var toDo = searchTerms.length;
        var finish= false;
        var that= this;

        searchTerms.forEach(function(searchTerm){
            console.log("recherche demandé pour terme: "+searchTerm);
            that.basicSearch(searchTerm, function(result){
               
                
                result.forEach(function(r){

                    results.push(r);
                });
                console.log("Taille des resultats: "+results.length);
                counter++;
                console.log("counter :"+counter);
                console.log("toDo :"+toDo);
                if(counter == toDo){
                    callback(results);
                }
            });
        });


    };

    



    module.exports = SearchDal;
})();