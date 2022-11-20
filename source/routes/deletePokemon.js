const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
   app.delete("/api/pokemons/:id", (req, res) => {
      Pokemon.findByPk(req.params.id) // ici on a plus besoin de parseInt(req.params.id) car sequelize le connait déjà
         .then((pokemon) => {
            const pokemonDelete = pokemon;
            Pokemon.destroy({
               where: { id: pokemon.id },
            }).then((pokemon) => {
               const message = `Le pokémon ayant l'identifiant n°:${pokemonDelete.id} a bien bien supprimé`;
               res.json({ message, data: pokemonDelete });
            });
         })
         .catch((err) => console.error(err));
   });
};
