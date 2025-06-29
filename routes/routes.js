const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemon");
const trainerController = require("../controllers/trainer");

router.get("/",isLoggedIn ,pokemonController.getPokemon);
router.get("/pokemon/:id", pokemonController.getPokemonById);
router.post("/pokemon", pokemonController.createPokemon);
router.put("/pokemon/:id", pokemonController.updatePokemon);     // PUT route
router.delete("/pokemon/:id", pokemonController.deletePokemon);  // DELETE route

router.get("/allTrainers", trainerController.getTrainer);
router.get("/trainer/:id", trainerController.getTrainerById);
router.post("/trainer", trainerController.createTrainer);
router.put("/trainer/:id", trainerController.updateTrainer);     // PUT route
router.delete("/trainer/:id", trainerController.deleteTrainer); 


function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/auth/google");
    }

module.exports = router;
