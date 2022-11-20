const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
   app.get("/api/pokemons", (req, res) => {
      Pokemon.findAll()
         .then((pokemons) => {
            const message = "voici la liste des pokémons dans le pokedex";
            res.json({ message, data: pokemons });
         })
         .catch((err) => {
            const message = `la liste des pokémons n'a pas pu être récupérer. Réessayez dans quelque erreur`;
            res.status(500).json({ message, data: err });
            console.error(err);
         });
   });
};
