

/**
* Module dependencies.
*/
var UserReportDAL = require('../dal/userReportDAL');

/**
* userReportController class
*/
(function () {

    /**
    * Attributes.
    */
    var userReportDAL = new UserReportDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function UserReportController(app) {
        this.routes(app);
    }

    /**
    * userReportController routes.
    * @param {app} - express app.
    */
    UserReportController.prototype.routes = function(app) {
        app.get('/userReport', this.list);
        app.post('/userReport/create', this.create);
        app.get('/userReport/delete/:id', this.delete);
        app.post('/userReport/delete', this.destroy);
    };

    /**
    * [httpget]
    * UserReportController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserReportController.prototype.list = function(req, res) {
        userReportDAL.getAll(function (userReports) {
            res.render('userReport/index', { 'userReports': userReports });
        });
    };

    
    /**
    * [httppost]
    * userReportController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserReportController.prototype.create = function(req, res) {

        var userReport = req.body.userReport;
        
       // console.log("userReport: "+JSON.stringify(userReport));

        if(req.xhr){
            //console.log("J'ai recu un appel ajax!");
            userReportDAL.save(userReport, function (data) {
           
                console.log("demande prise en compte: "+JSON.stringify(data));
                res.writeHead(200, {"Content-Type":"application/json"});
                res.end(JSON.stringify(data));
            });
        } else {
            //console.log("c'pas ajax mais on va s'arranger.");
            userReportDAL.save(userReport, function (data) {
           
                //console.log("demande prise en compte: "+JSON.stringify(data));
                
                req.flash("flash", "Votre demande à bien était prise en compte. Vous pouvez visualiser la liste des demandes <a href='/userReport'> ICI </a>");
                res.redirect("/");
            });
        }
        
    };

    /**
    * [httpget]
    * UserReportController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserReportController.prototype.delete = function(req, res) {
        var userReportId = req.params.id;
        userReportDAL.get(userReportId, function (userReport) {
            res.render('userReport/delete', { 'userReport': userReport });
        });
    };

    /**
    * [httppost]
    * UserReportController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserReportController.prototype.destroy = function(req, res) {
        var userReport = req.body.userReport;
        userReportDAL.remove(userReport.id, function (data) {
            res.redirect('/userReport');
        });
    };

    module.exports = UserReportController;
})();