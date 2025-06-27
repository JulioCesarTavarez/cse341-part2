const mongoose = require("mongoose");
//create Schema
let Pokemon;

if (mongoose.modelNames().includes("Pokemon")) {
    Pokemon = mongoose.model("Pokemon");
    console.log("Pokemon model already exists");
} else {
    const pokemonSchema = mongoose.Schema({
       pokeName: {
            type: String,
            required: true,
        },
        pokeSet: {
            type: String,
            required: true,
        },
        pokePrice: {
            type: Number,
            required: true,
        },
        pokeType: {
            type: String,
            required: true,
        }
    });
    Pokemon = mongoose.model("Pokemon", pokemonSchema);
    console.log("Pokemon model defined");
}
module.exports = Pokemon;