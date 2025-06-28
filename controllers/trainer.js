//controler
const Trainer = require("../models/trainer");

const getTrainer = async (req , res) => {
    try{
        const trainer = await Trainer.find();
        res.json(trainer);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }   
};

const getTrainerById = async (req , res) => {
    try{
        const trainer = await Trainer.findById(req.params.id);
        res.json(trainer);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }   
};

const createTrainer = async (req , res) => {
    const trainer = new Trainer({
        name: req.body.name,
        region: req.body.region,
        age: req.body.age,
        badges: req.body.badges,
        specialtyType: req.body.specialtyType,
        isChampion: req.body.isChampion,
        favoritePokemon: req.body.favoritePokemon
    });
    try{
        const newTrainer = await trainer.save();
        res.status(201).json(newTrainer);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateTrainer = async (req , res) => {
    try {
        const updatedTrainer = await Trainer.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
    
        if (!updatedTrainer) {
          return res.status(404).json({ message: "Trainer not found" });
        }
    
        res.status(204).send(); // No content
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

const deleteTrainer = async (req , res) => {
    try {
        const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!deletedTrainer) {
          return res.status(404).json({ message: "Trainer not found" });
        }
    
        res.status(200).json({ message: "Trainer deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

module.exports = {
    getTrainer,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer
};
