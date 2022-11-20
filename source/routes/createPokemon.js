const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
   app.post("/api/pokemons", (req, res) => {
      Pokemon.create(req.body)
         .then((pokemon) => {
            const message = `Le pokémon ${pokemon.name} a bien été créer`;
            res.json({ message, data: pokemon });
         })
         .catch((err) => {
            const message = `la liste des pokémons n'a pas pu être ajouté. Réessayez dans quelque erreur`;
            res.status(500).json({ message, data: err });
            console.error(err);
         });
   });
};
