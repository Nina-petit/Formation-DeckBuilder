const database = require('./database');
const { search } = require('./router');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text : `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },

  getCardById: (cardId, callback) => {
    const selectCardByIdQuery = `SELECT * FROM card WHERE id = $1;`;

    database.query(selectCardByIdQuery, [cardId], callback);
  },

  getCardsByIds: (idsArray, callback) => {
    const selectCardsQuery = `SELECT * from card WHERE id = ANY($1);`;

   database.query(selectCardsQuery, [idsArray], callback);
  }, 

  getCardsByElement: (cardElement, callback) => {
    const selectCardByElementQuery = `SELECT * FROM card WHERE element ${cardElement};`;

    database.query(selectCardByElementQuery, callback);
  },

  getCardsByLevel: (cardLevel, callback) => {
    const selectCardByElementQuery = `SELECT * FROM card WHERE level = $1`;

    database.query(selectCardByElementQuery, [cardLevel], callback);
  },

  getCardsByValue: (directionValue, searchedValue, callback) => {
    const selectCardByValueQuery = `SELECT * FROM card WHERE ${directionValue} >= ${searchedValue}`;

    database.query(selectCardByValueQuery, callback);
  },

  getCardsByName: (nameCapitalized, nameInLowerCase, callback) => {
    const selectCardByElementQuery = ` SELECT * FROM card WHERE name LIKE '%${nameCapitalized}%' OR name LIKE '%${nameInLowerCase}%';
    `;

    database.query(selectCardByElementQuery, callback);
  },
};


module.exports = dataMapper;