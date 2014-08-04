/**
* DbContext class
*/
(function () {

    var modelsPath = __dirname + '/../app/models/';

    /**
    * Constructor.
    */
    function DbContext() {
        this.db = require('./dbConnection');
        this.entities();
        this.modelBuilder();
    }

    /**
     * Attach your model to DbContext like user to perform database sync.

        - users
        - museum
        - role user/museum
        - oeuvre
        - recolement /oeuvre
        - champs 
        - dossier oeuvre champs/oeuvre
        - logs
     * 
     */
    DbContext.prototype.entities = function() {

        this.user = this.db.import(modelsPath + 'user');
        this.museum = this.db.import(modelsPath + 'museum');
        this.role = this.db.import(modelsPath + 'role');
        this.userRole = this.db.import(modelsPath + 'userRole');

        this.oeuvre = this.db.import(modelsPath + 'oeuvre');
        this.recolement = this.db.import(modelsPath + 'recolement');
        this.dossierOeuvre = this.db.import(modelsPath + 'dossierOeuvre');
        this.champs = this.db.import(modelsPath + 'champs');
        // model CDN pour les fichier joints

        //bug reporting
        this.userReport = this.db.import(modelsPath + 'userReport');


    };

    /**
    * Manage Database entities associations here.
    */
    DbContext.prototype.modelBuilder = function () {

        // gestion des permissions utilisateurs
        this.user.hasMany(this.museum, {through: this.userRole});
        this.museum.hasMany(this.user, {through: this.userRole});
        this.userRole.belongsTo(this.role);

        // gestion de l'inventaire
        this.oeuvre.belongsTo(this.museum);
        this.recolement.belongsTo(this.oeuvre);

        //gestion dossier oeuvre
        this.champs.hasMany(this.oeuvre, {through: this.dossierOeuvre});
        this.oeuvre.hasMany(this.champs, {through: this.dossierOeuvre});


    };

    module.exports = DbContext;
})();