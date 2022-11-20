const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
   app.put("/api/pokemons/:id", (req, res) => {
      const id = req.params.id;
      Pokemon.update(req.body, {
         where: { id: id },
      })
         .then((_) => {
            return Pokemon.findByPk(id).then((pokemon) => {
               if (pokemon === null) {
                  const message = "le pokémon demandé n'existe pas";
                  res.status(404).json({ message });
               }
               const message = `Le pokémon ${pokemon.name} a bien bien modifié`;
               res.json({ message, data: pokemon });
            });
         })
         .catch((err) => {
            const message = `la liste des pokémons n'a pas pu être modifié. Réessayez dans quelque erreur`;
            res.status(500).json({ message, data: err });
            console.error(err);
         });
   });
};
