const express = require("express");
const router = express.Router();
const {
  saveStep1Data,
  updateStep1Data,
  getStep1DataById,
  deleteStep1Data,
} = require("../Controllers/stepe1Controller");
const { updateStep2Data,uploadStep2Image, processStep2Image, getStep2DataById } = require("../Controllers/step2Controller");
const { protect } = require("../Middleware/authMiddleware");
const { updateStep3Data, getStep3DataById, createStep3Data } = require("../Controllers/step3Controller");

// Route Step1
router.post("/create-step1", saveStep1Data);
router.put("/update-step1",protect, updateStep1Data);
router.get("/:id", protect,getStep1DataById);
router.delete("/:id", deleteStep1Data);

// Route Step2
router.put("/update-step2", protect,uploadStep2Image,processStep2Image,updateStep2Data);
router.get("/get-step2/:id", protect, getStep2DataById);
// Route Step3
router.post("/create-step3", protect, createStep3Data);
router.put("/update-step3", protect, updateStep3Data);
router.get("/get-step3/:userId", protect, getStep3DataById);
module.exports = router;
