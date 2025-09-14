const mongoose = require("mongoose");

const step1Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: false },
  trafic: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  discipline: { 
    type: String, 
    required: true, 
    enum: [
      "e-commerce", "education", "healthcare", "finance", "real-estate", "other"
    ]
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "maintenance", "inactive"], 
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
});

const step1Model = mongoose.model("step1model", step1Schema);

module.exports = step1Model;
