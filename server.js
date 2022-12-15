const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon"); // package pour afficher une favicon
const sequilize = require("./source/db/sequelize");
const app = express();
const port = 3000;

app.use(favicon(__dirname + "/favicon.ico"))
   .use(morgan("dev")) // le middlware morgan permet d'afficher à la console tout le req.ul status .. dans la console
   // option dev permet de minimiser l'affichage
   .use(bodyParser.json());

sequilize.initDB(); // créer un connexion avec sequilize;

//ici nous placons futur points de terminaisons
require("./source/routes/findAllPokemons")(app);
require("./source/routes/findPokemonByPk")(app);
require("./source/routes/createPokemon")(app);
require("./source/routes/updatePokemon")(app);
require("./source/routes/deletePokemon")(app);

app.use(({ res }) => {
   const message = "page not found";
   res.status(404).json({ message });
});

app.listen(port, (err) => {
   if (err) throw err;
   console.log(`notre serveur marche sur http://localhost:${port}`);
});
