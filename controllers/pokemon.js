const Pokemon = require("../models/pokemon");

// Get all pokemon
const getPokemon = async (req, res) => {
    try{
        const pokemon = await Pokemon.find();
        res.json(pokemon);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPokemonById = async (req, res) => {
    try{
        const pokemon = await Pokemon.findById(req.params.id);
        res.json(pokemon);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createPokemon = async (req, res) => {
    const pokemon = new Pokemon({
        pokeName: req.body.pokeName,
        pokeSet: req.body.pokeSet,
        pokePrice: req.body.pokePrice,
        pokeType: req.body.pokeType
    });
    try{
        const newPokemon = await pokemon.save();
        res.status(201).json(newPokemon);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const updatePokemon = async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.status(204).send(); // No content
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePokemon = async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.status(200).json({ message: "Pokemon deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getPokemon,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon
};