const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
   app.get("/api/pokemons/:id", (req, res) => {
      Pokemon.findByPk(req.params.id)
         .then((pokemon) => {
            if (pokemon == null) {
               const message = "le pokémon demandé n'existe pas";
               res.status(404).json({ message });
            }
            const message = "Le pokémon a été bien trouvé ";
            res.json({ message, pokemon });
         })
         .catch((err) => {
            const message = `la liste des pokémons n'a pas pu être récupéré. Réessayez dans quelque erreur`;
            res.status(500).json({ message, data: err });
            console.error(err);
         });
   });
};
