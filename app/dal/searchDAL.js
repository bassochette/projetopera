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

    /**
    * Get a user by id.
    * @param {userId} - user primary key.
    * @param {callback} - callback function. 
    */
    SearchDal.prototype.basicSearch = function (searchString, callback) {
        //utiliser un array ou découper la string en plusieurs mot
        console.log("searchSring at DAL :"+JSON.stringify(searchString));

        var search =searchString;
        var searchResult = [];
        var stateCounter = 0;

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

            var searches = search.split(" ");
            var searchTermCount = searches.length;
            console.log(JSON.stringify(searches));

            for(i = 0; i<searchTermCount; i++){
                dbContext.oeuvre.findAll({
                    where : sql.or({ designation : {like : '%'+searches[i]+'%'}},
                    { observations : {like : '%'+searches[i]+'%'}},
                    { techniques : {like : '%'+searches[i]+'%'}},
                    { materiaux : {like : '%'+searches[i]+'%'}},
                    { datation : {like : '%'+searches[i]+'%'}},
                    { provenance : {like : '%'+searches[i]+'%'}},
                    { auteur : {like : '%'+searches[i]+'%'}},
                    { oeuvreId : {like : '%'+searches[i]+'%'}})
                }).success(function(result){
                    searchResult.push(result);

                });


            }

            callback(result);
        });
    };



    module.exports = SearchDal;
})();