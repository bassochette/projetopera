/**
* homeController class
*/
var MembershipFilters = require('../../middleware/membershipFilters');
(function () {

    var filters = new MembershipFilters();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function HomeController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    HomeController.prototype.routes = function(app) {
        app.get("/", filters.authorize, this.new);
        app.get("/search", filters.authorize, this.index);
        
    };

    /**
     * [HttpGet].
     * index action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.index = function(req, res) {
        res.render('home/index');
        
    };
    HomeController.prototype.new = function(req, res){
        res.redirect('/oeuvre/new');
    };
    module.exports = HomeController;
})();