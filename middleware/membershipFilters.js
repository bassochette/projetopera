/**
* MembershipFilters class
*/
var MembershipFilters = module.exports = (function () {

    /**
    * Constructor.
    */
    function MembershipFilters() {
    }

    /**
    * MembershipFilters actions.
    * @param {req} - http request.
    * @param {res} - http response.
    * @param {next} - callback.
    */
    MembershipFilters.prototype.authorize = function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        else{
            if(req.xhr){
                res.send("Vous n'êtes pas autorisé à consulter cette ressource...");
            }else{
                res.redirect('/account/login');
            }
        }
    }

    MembershipFilters.prototype.admin = function(req, res, next){
        if(req.user.isAdmin){ return next();}
        else{
            if(req.xhr){
                res.send("Seuls les administrateurs peuvent accéder à cette ressource....");
            } else {
                res.flash('Pas d\'admin, pas de page!');
                res.redirect('/index');
            }
        }

    }
    return MembershipFilters;
})();