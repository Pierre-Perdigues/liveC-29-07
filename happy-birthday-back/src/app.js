const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
var cookieParser = require('cookie-parser');

const middleware = require('./api/middleware/middleware.js');

const hostname = '0.0.0.0';
const port = 3002;

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'origine de votre front-end
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(express.urlencoded());
server.use(express.json())
server.use(cookieParser());
server.use(middleware)

const birthdayRoute = require('./api/routes/birthdayRoute.js');
birthdayRoute(server);

const managerRoute = require('./api/routes/managerRoute.js');
managerRoute(server);

const quoteRoute = require('./api/routes/quoteRoute.js');
quoteRoute(server);

sequelize.sync().then(() => {
  console.log('BDD synchro');
  server.listen(port, hostname, () => {
    console.log(`Serveur qui tourne sur le port ${port}`);
  });
}).catch(err => {
  console.error('Pb connexion bdd:', err);
});

