const express = require('express');
let pokemons = require('./pokemons');
const { success } = require('./helper')
const app = express();
const port = 9000;


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
    res.json(success(message,pokemons))
})
app.listen(port, () => {
    console.log(`notre serveur marche sur http://localhost:${port}`)
});