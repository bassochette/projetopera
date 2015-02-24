// Dependencies

var passport          = require('passport');
var bcrypt            = require('bcrypt-nodejs');
var MembershipFilters = require('../../middleware/membershipFilters');
var UserDal           = require('../dal/userDal');

(function(){

	var userDal = new UserDal();
	var filters = new MembershipFilters();

	function AccountAPI (app){
		this.routes(app);
	};

	AccountAPI.prototype.routes = function(app){
		// app.post('/accountAPI/login', this.authenticate);
		// app.post('/accountAPI/register', this.register);
		// app.get('/accountAPI/logout', this.logout);

        app.get("/api/utilisateur/compte", this.undef); // todo
        app.post('/api/utilisateur/inscription', this.undef); //todo
        app.post('/api/utilisateur/connexion', this.undef); //todo
        app.post('/api/utilisateur/deconnexion', this.undef); //todo
	};

	AccountAPI.prototype.login = function(req, res){
        var user = req.body.user;
        var authString = req.body.authString;



	}

	AccountAPI.prototype.logout = function(req, res){

	}

	AccountAPI.prototype.register = function(req, res){
		if (req.body.password === req.body.confirmPassword && req.body.password.length > 1) {
            userDal.getByUsername(req.body.username, function (user) {
                if (!user) {
                    encryptPassword(req.body.password, function(hashedpassword){
                        var newUser = {};
                        newUser.username = req.body.username;
                        newUser.email = req.body.email
                        newUser.password = hashedpassword;

                        userDal.save(newUser, function (data) {
                            res.send(data);
                        });
                    });
                }
                else {
                    res.send({ "message": "utilisateur déjà existant..."});
                }
            });
        }
        else {
            res.send({"message":"mot de passe non valide"});
        }
	}


	var encryptPassword = function (password, callback){
	    bcrypt.genSalt(10, function(err, salt) {
	        if (err) console.log('error during encryption');
	        bcrypt.hash(password, salt, null, function(err, cryptedPassWord) {
	            if(err){ throw err; }
	            else{
	            }
                callback(cryptedPassWord);
            });
	    });
	}

	
	var comparePassword = function (password, encryptedPassWord, callback){
	    bcrypt.compare(password, encryptedPassWord, function(err, result){
	        if(err){throw err;}
	        return callback(result);
	    });
	}

    var authorizeUser = function(username, authString){

        userDal.getByUsername(username, function(user){


        });
    }

    AccountAPI.prototype.undef = function(){
        return {"message":"route en chantier."};
    };

	module.exports = AccountAPI;

})()