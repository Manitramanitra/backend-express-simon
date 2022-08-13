const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pokemon')
let pokemons = require('./pokemons');

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

const Pokemon = PokemonModel(sequelize, DataTypes);

const initDB = () => {
    return sequelize.sync({ force: true })
        .then(_ => {
            console.log('la base de données Pokedex a bien été synchronisée.')

            pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types,
                }).then(/*pokemons =>console.log(pokemons.toJSON())*/)
            })
            console.log('la base de données a bien été initialisé');
        })
}

module.exports={ initDB, Pokemon }