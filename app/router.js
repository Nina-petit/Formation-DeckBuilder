const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');

// Page d'accueil
router.get('/', mainController.homePage);

// Page de recherche
router.get('/search', searchController.searchPage);

// Recherche d'une carte par élément
router.get('/search/element', searchController.cardListByElement);

// Recherche d'une carte par niveau
router.get('/search/level', searchController.cardListByLevel);

// Recherche d'une carte par valeur
router.get('/search/values', searchController.cardListByValue);

// Recherche d'une carte par nom
router.get('/search/name', searchController.cardListByName);

// Détail d'une carte
router.get('/card/:cardId', mainController.cardDetail);

// Page Decks
router.get('/deck', deckController.deckPage);

// Ajout d'une carte à la page Decks
router.get('/deck/add/:cardId', deckController.addCardToDeck);

// Suppression d'une carte de la page Decks
router.get('/deck/delete/:cardId', deckController.deleteCardFromDeck);


module.exports = router;