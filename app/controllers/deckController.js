const dataMapper = require('../dataMapper.js');

const deckController = {
    // Pour afficher la page du deck
    deckPage: (req, res) => {
        if(!req.session.deck) {
            // Si l'utilisateur n'a encore ajouté aucune carte au deck, on affiche la page vide
          res.render('deck', {
            cards: [],
            title: 'Deck'
          });
        } else {
            // Si l'utilisateur en a déjà ajouté, on récupère les infos de ces cartes grâce à l'id
            dataMapper.getCardsByIds(req.session.deck, (err, result) => {
            if (err) {
            // Si il y a une erreur, on l'affiche
              console.log('error: ', err);
              res.send(err);
            } else {
                // Sinon, on affiche la page avec les cartes aujoutées
              res.render('deck', {
                  cards: result.rows,
                  title: 'Deck'
                });
            };
          });
        }
    },

    // Pour ajouter une carte au deck
    addCardToDeck: (req, res) => {
      const cardId = req.params.cardId;

      // Si le deck n'existe pas encore, on le crée
      if (!req.session.deck) {
        req.session.deck = [];
      };

      // Si le deck contient moins de 5 cartes, on ajoute l'ID de la carte qu'on veut ajouter à la liste du deck
      if (req.session.deck.length < 5) {
        req.session.deck.push(cardId);
      }

      // On redirige vers la page deck
      res.redirect('/deck');
    },

    // Pour supprimer une carte du deck
    deleteCardFromDeck: (req, res) => {
        const cardId = req.params.cardId;

        // On cherche la carte qu'on veut supprimer dans le deck et on la supprime
        req.session.deck = req.session.deck.filter((id) => id !== cardId);

        // On redirige vers la page deck
        res.redirect('/deck');
    },
};

module.exports = deckController;