const dataMapper = require('../dataMapper.js');

const searchController = {
  // Pour afficher la page de recherche
  searchPage: (req, res) => {
    res.render('search', {title: 'Chercher des cartes'});
  },

  // Pour rechercher par élément
  cardListByElement: (req, res) => {
      let element = req.query.element;
      if (element == 'null') {
        // Si l'utilisateur a sélectionné "aucun", on adapte la requête pour 
        // qu'elle cherche les lignes avec une valeur 'element' nulle
        element = 'IS NULL';
      } else {
        // Sinon, on adapte la requête pour qu'elle cherche les lignes avec
        // la valeur 'element' qui correspond
        element = `= '${element}'`;
      };

    // On récupère les infos des cartes grâce à leur élément
    dataMapper.getCardsByElement(element, (err, result) => {
      if(err) {
        // S'il y a une erreur, on l'affiche
        console.log(err);
      } else {
        // Sinon, on affiche la page d'accueil avec les cartes qui correspondent à la recherche
        res.render('cardList', {
          cards : result.rows,
          title: 'Liste des cartes'
        });
      }
    })
  },

  // Pour rechercher par niveau
  cardListByLevel: (req, res) => {
      const level = req.query.level;

      // On récupère les infos des cartes grâce à leur niveau
    dataMapper.getCardsByLevel(level, (err, result) => {
      if(err) {
        // S'il y a une erreur, on l'affiche
        console.log(err);
      } else {
        // Sinon, on affiche la page d'accueil avec les cartes qui correspondent à la recherche
        res.render('cardList', {
          cards : result.rows,
          title: 'Liste des cartes'
        });
      }
    })
  },

  // Pour rechercher par valeur
  cardListByValue: (req, res) => {
    const directionValue = `value_${req.query.direction}`;
    const searchedValue = req.query.value;

    // On récupère les infos des cartes grâce à leur valeur dans la direction désirée
    dataMapper.getCardsByValue(directionValue, searchedValue, (err, result) => {
      if(err) {
        // S'il y a une erreur, on l'affiche
        console.log(err);
      } else {
        res.render('cardList', {
          // Sinon, on affiche la page d'accueil avec les cartes qui correspondent à la recherche
          cards : result.rows,
          title: 'Liste des cartes'
        });
      }
    })
  },

  // Pour rechercher par nom
  cardListByName: (req, res) => {
    const name = req.query.name;
    // On modifie le nom pour que la requête cherche à la fois les cartes avec 'name'
    // qui comprend la valeur entrée avec et sans majuscule
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    const nameInLowerCase = name.toLowerCase();

    // On récupère les infos des cartes grâce à leur nom
    dataMapper.getCardsByName(nameCapitalized, nameInLowerCase, (err, result) => {
      if(err) {
        // S'il y a une erreur, on l'affiche
        console.log(err);
      } else {
        res.render('cardList', {
          // Sinon, on affiche la page d'accueil avec les cartes qui correspondent à la recherche
          cards : result.rows,
          title: 'Liste des cartes'
        });
      }
    })
  },

};

module.exports = searchController;