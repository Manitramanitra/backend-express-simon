const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
   app.delete("/api/pokemons/:id", (req, res) => {
      Pokemon.findByPk(req.params.id) // ici on a plus besoin de parseInt(req.params.id) car sequelize le connait déjà
         .then((pokemon) => {
            if (pokemon === null) {
               const message =
                  "le pokémon demandé n'existe pas, réessayez une autre identifiant";
               res.status(404).json({ message });
            }
            const pokemonDelete = pokemon;
            return Pokemon.destroy({
               where: { id: pokemon.id },
            }).then((_) => {
               const message = `Le pokémon ayant l'identifiant n°:${pokemonDelete.id} a bien bien supprimé`;
               res.json({ message, data: pokemonDelete });
            });
         })
         .catch((err) => {
            const message = `la liste des pokémons n'a pas pu être récupéré. Réessayez dans quelque erreur`;
            res.status(500).json({ message, data: err });
            console.error(err);
         });
   });
};
