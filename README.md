README
======

Installation
------------
Prérequis :

    node js
    npm
    Base de données Mysql
        config: config/database.json

    En cas de soucis avec l'upload d'image:
        vérifier la présence des dossiers: ./upload , ./upload/images et ./tmpUpload

    forever

Rouler les commandes :

	sudo npm install
	bower install
	grunt build

Pour lancer le serveurs plusieurs options:

    - Dev :
        grunt debug

    - Prod :
        forever start museionServer

    - Autre :
        nohup node museionServer
        node museionServer

Branches:
---------
    - master : Version de production, stable et toujours déployable mais va devenir legacy lorsque newArch sera prète
    - newArch : Version en cours de refactoring

Fonctionnalité:
--------------

    * Présente :

        - RESTFUL api
        - Fiche d'inventaire "18 colonnes" réglementaire
        - Ajout d'image
        - Dossier oeuvre flexible et personnalisable
        - Authentification et gestion des role basique
        - Verrouillage

    * À venir :

        - Export format joconde + dossier compressé complet sur l'oeuvre
            - Joconde
            - image
            - fiche pdf inventaire
            - fiche pdf dossier oeuvre

        - Import dossier compressé
        - Dashboard d'utilisation (admin)
        - Panel de configuration (admin)
        - Gestion des "favoris" par utilisateur
        - Champs dossier oeuvre complex, exemples: list, donné composite
        - Gestion des fichiers type pdf, doc, xls,...
        - Liens entre les oeuvres définie par l'utilisateur
        - recherche avancé


Architecture :
--------------

Contact :
---------
Julien Prugne
Twitter: @bassochette

julien.prugne@gmail.com
514 913 1330
