const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const expressSession = require('express-session');

const PORT = process.env.PORT || 1234;
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
