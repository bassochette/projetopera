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
            //console.log('Resultat recu pour: '+searchString);
            //console.log('hit: '+result.length);
            callback(result);
        }).error(function(err){
            //console.log("Erreur pour recherche: "+searchString);
            //console.log("err: "+err);
        });

    };

    SearchDal.prototype.multiTermSearch = function(searchString, callback){
        
        var searchTerms = searchString.split(" ");
        var results = [];
        var counter = 0;
        var toDo = searchTerms.length;
        var that= this;


        that.basicSearch(searchString, function(result){
            
            result.forEach(function(r){
                results.push(r);
            });

            //console.log("Taille des resultats: "+results.length);
            counter++;
            console.log("counter :"+counter);
            console.log("toDo :"+toDo);

            if(counter == (toDo + 1) || searchTerms.length == 1){

                callback(results);
            }
        });

        if(searchTerms.length > 1){ 
            searchTerms.forEach(function(searchTerm){

                //console.log("recherche demandé pour terme: "+searchTerm);
                that.basicSearch(searchTerm, function(result){ 

                    result.forEach(function(r){
                        results.push(r);
                    });

                    //console.log("Taille des resultats: "+results.length);
                    counter++;
                    //onsole.log("counter :"+counter);
                    //console.log("toDo :"+toDo);

                    var orderedResults = [];

                    if(counter == (toDo + 1)){

                        results = results.sort(function(a,b){
                            return (a.id > b.id) ;
                        });

                        var tmpCounter = 0;

                        for(i=0; i < results.length; i++){
                            //console.log("i = "+i+" :"+JSON.stringify(results[i]));
                            //console.log("results[i].id: "+ results[( i )].id);
                            
                           
                            if(typeof results[(i+1)] == 'undefined'  ){
                                results[i].hit = tmpCounter;
                                tmpCounter = 0;
                                orderedResults.push(results[i]);
                                //console.log("last push");

                            } else if( results[i].id == results[( i + 1 )].id){
                                //console.log("egale");
                                tmpCounter++;

                            } else{
                                results[i].hit = tmpCounter;
                                tmpCounter = 0;
                                orderedResults.push(results[i]);
                                //console.log("push");
                            }
                        }

                        orderedResults = orderedResults.sort(function(a,b){
                            return (a.hit < b.hit) ;
                        });

                        //console.log("orderedResults: "+JSON.stringify(orderedResults));

                        callback(orderedResults);
                    }

                });

            });
        }


    };

    



    module.exports = SearchDal;
})();