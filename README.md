# P6-Piiquante - Hot Takes

Projet n°6 du parcours Développeur Web d'OpenClassrooms : Construisez une API sécurisée pour une application d'avis gastronomiques.

    Il s'agit d'implémenter l'API du site "Piiquante/ Hot Takes" avec une base de donnée NoSQL. Les données utilisateurs doivent respectées le RGPD et l'API doit être sécurisée en respectant les préconisation de l'OWASP.


## 📚 Technologies utilisées

    JavaScript
    NodeJS
    Express
    MongoDB

## 📦 Installation des packages et démarrez les serveurs

Depuis le terminal, positionnez-vous dans le dossier `backend`  et exécutez la commande :
`npm install` 
pour installer les packages requis pour le fonctionnement de l'API et ensuite exécutez la commande:
`npm run start`
pour démarrer le serveur du backend.
Le message suivant devrait s'afficher dans le terminal :
`Listening on port 3000`
Si le serveur s'exécute sur un autre port, celui-ci sera affiché dans la console à la place de port 3000. 


Puis positinnez-vous dans le dossier frontend et exécutez la commande :
`npm install`
pour installer les packages requis pour le fonctionnement du frontend et ensuite exécutez la commande:
`npm run start`
pour démarrer le serveur du frontend -- Port 4200


## 🔐 Variables d'environnement 

Dans le dossier backend, créez le fichier .env et déclarez les variables nécessaires selon le dossier .env.example pour entre connecter une base de données à l'API (ou changez .env.example en .env)

## ⚙️ Connection à Mongo DB

Suite aux déclarations des variables dans .env,  la connexion à la base de donnée s'affiche sur la console quand le serveur démarre : Connexion à MongoDB réussie ! 



