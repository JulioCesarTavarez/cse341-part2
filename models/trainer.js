const mongoose = require("mongoose");

let Trainer;

if (mongoose.modelNames().includes("Trainer")) {
  Trainer = mongoose.model("Trainer");
  console.log("Trainer model already exists");
} else {
  const trainerSchema = mongoose.Schema({
    name: { type: String, required: true },
    region: { type: String, required: true },
    age: { type: Number, required: true },
    badges: { type: Number, required: true },
    specialtyType: { type: String, required: true },
    isChampion: { type: Boolean, required: true },
    favoritePokemon: { type: String, required: true }
  });
  Trainer = mongoose.model("Trainer", trainerSchema);
  console.log("Trainer model defined");
}

module.exports = Trainer;
