const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const sequilize = require('./source/db/sequelize')
const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());

sequilize.initDB();

//ici nous placons futur points de terminaisons
require('./source/routes/findAllPokemons')(app);
require('./source/routes/findPokemonByPk')(app);
require('./source/routes/createPokemon')(app);
require('./source/routes/updatePokemon')(app);

app.listen(port, () => {
    console.log(`notre serveur marche sur http://localhost:${port}`)
});
