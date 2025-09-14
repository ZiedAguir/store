const mongoose = require("mongoose");

const step3Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  selectedPages: {
    type: [String], // Tableau des pages sélectionnées
    required: true,
  },
  formSelections: {
    type: Map,
    of: [String], // Map contenant les options choisies pour chaque page
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Step3Model = mongoose.model("step3model", step3Schema);

module.exports = Step3Model;

