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
        app.get("/", filters.authorize, this.index);
        
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

    module.exports = HomeController;
})();