const mongoose = require("mongoose");

const step2Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  logo: {
    type: String,
  },
  slogan: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  column: {
    type: Number,
    required: true,
    min: 1,
  },
  domain: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const step2Model = mongoose.model("step2model", step2Schema);

module.exports = step2Model;
