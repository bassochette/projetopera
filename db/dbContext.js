/**
* DbContext class
*/
(function () {

    var modelsPath = __dirname + '/../backend/models/';

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
        //this.museum = this.db.import(modelsPath + 'museum');
        //this.role = this.db.import(modelsPath + 'role');
        //this.userRole = this.db.import(modelsPath + 'userRole');

        this.oeuvre = this.db.import(modelsPath + 'oeuvre');
        //this.recolement = this.db.import(modelsPath + 'recolement');
        this.dossierOeuvre = this.db.import(modelsPath + 'dossierOeuvre');
        this.champs = this.db.import(modelsPath + 'champs');

        // model CDN pour les fichier joints
        this.image = this.db.import(modelsPath + 'image');

        //gestion des favoris
        //this.selectionFolder = this.db.import(modelsPath + 'selectionFolder');
        //this.selectionItem = this.db.import(modelsPath + 'selectionItem');

        //bug reporting
        //this.userReport = this.db.import(modelsPath + 'userReport');


    };

    /**
    * Manage Database entities associations here.
    */
    DbContext.prototype.modelBuilder = function () {

        // gestion des permissions utilisateurs
        //this.user.hasMany(this.museum, {through: this.userRole});
        //this.museum.hasMany(this.user, {through: this.userRole});
        //this.userRole.belongsTo(this.role);

        // gestion de l'inventaire
        //this.oeuvre.belongsTo(this.museum);
        //this.recolement.belongsTo(this.oeuvre);
        this.image.belongsTo(this.oeuvre, {foreignKey: 'oeuvreId'});

        //gestion dossier oeuvre
        this.oeuvre.hasMany(this.dossierOeuvre, {foreignKey: 'oeuvreId'});
        this.dossierOeuvre.belongsTo(this.oeuvre, {foreignKey: 'oeuvreId'})
        this.champs.hasMany(this.dossierOeuvre, {foreignKey: 'champsId'});
        this.dossierOeuvre.belongsTo(this.champs, {foreignKey: 'champsId'});

        //gestion favoris aka selection
        //this.selectionFolder.belongsTo(this.user, {foreignKey: 'uid'});
        //this.selectionItem.belongsTo(this.selectionFolder, {foreignKey: 'folderId', unique: 'itemUniqueIndex'});
        //this.selectionItem.belongsTo(this.oeuvre, {foreignKey: 'oeuvreId', unique: 'itemUniqueIndex'});
        //this.user.hasMany(this.selection, {as: 'uid'});
    };

    module.exports = DbContext;
})();