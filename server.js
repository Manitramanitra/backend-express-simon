const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('./source/models/pokemon')
let pokemons = require('./source/db/pokemons');
const { success, getUniqueId } = require('./helper')
const app = express();
const port = 3000;

const sequelize = new Sequelize(
    'pokedex',//nom de la base de données
    'root',
    'a1818128a',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timeZone: 'Etc/GMT-2'
        },
        logging: false
    }
)

sequelize.authenticate()
    .then(_ => console.log('la connexion a réussit'))
    .catch(err => console.error(`impossible de se connecter a la base de donnée ${err}`))

const Pokemon = PokemonModel(sequelize, DataTypes);

sequelize.sync({ force: true })
    .then(_ => {
        console.log('la base de données Pokedex a bien été synchronisée.')

        pokemons.map(pokemon=>{
            Pokemon.create({
                name:pokemon.name,
                hp:pokemon.hp,
                cp:pokemon.cp,
                picture:pokemon.picture,
                types: pokemon.types.join(), 
            }).then(pokemons=>console.log(pokemons.toJSON()))

        })
    })


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json()); 

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});
app.get("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "pokémon a été bien trouvé.";
    res.json(success(message, pokemon));
})
app.get("/api/pokemons", (req, res) => {
    const message = "Voici tous les pokémons dans le pokédex";
    res.json(success(message, pokemons))
})


app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);//on ajoute un id unique 
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée`;
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id };
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`;
    res.json(success(message, pokemonUpdated));
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonDelete = pokemons.find(pokemon => pokemon.id === id);
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDelete.name} a bien été supprimé`
    res.json(success(message, pokemonDelete))
})

app.listen(port, () => {
    console.log(`notre serveur marche sur http://localhost:${port}`)
});
