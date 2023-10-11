const dataMapper = require('../dataMapper.js');

const mainController = {
  // Pour afficher la page d'accueil
  homePage: (req, res) => {
    dataMapper.getAllCards( (err, results) => {
      if(err) {
        // S'il y a une erreur, on l'affiche
        console.error(err);
        return;
      } 
      // Sinon, on affiche la page d'accueil avec les cartes qu'on a récupérées
      res.render('cardList', {
        cards: results.rows,
        title: 'Liste des cartes'
      })
    });
  },

  // Pour afficher le détail d'une carte
  cardDetail: (req, res) => {
    const cardId = req.params.cardId;
    // On récupère les infos de la carte grâce à l'ID
    dataMapper.getCardById(cardId, (err, result) => {
      if(err) {
        // S'il y a une erreur, on l'affiche
        console.log(err);
      } else {
        // Sinon, on affiche la page de détail de la carte avec toutes ses infos
        res.render('cardDetail', {
          card : result.rows[0],
          title: 'Détail de la carte '
        });
      }
    })
  }
};

module.exports = mainController;