const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemon");

router.get("/", pokemonController.getPokemon);
router.get("/pokemon/:id", pokemonController.getPokemonById);
router.post("/pokemon", pokemonController.createPokemon);
router.put("/pokemon/:id", pokemonController.updatePokemon);     // PUT route
router.delete("/pokemon/:id", pokemonController.deletePokemon);  // DELETE route



module.exports = router;
