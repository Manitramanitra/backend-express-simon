const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
   app.get("/api/pokemons", (req, res) => {
      Pokemon.findAll()
         .then((pokemons) => {
            const message = "voici la liste des pokémons dans le pokedex";
            res.json({ message, data: pokemons });
         })
         .catch((err) => console.error(err));
   });
};
