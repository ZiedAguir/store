const express = require("express");
const {
  getCustomizationByUserId,
  updateCustomization,
  resetCustomization,
} = require("../Controllers/customizationController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.get("/get-customise/:userId",protect, getCustomizationByUserId);
router.put("/update-customise",protect, updateCustomization);
router.delete("/delete-customise/:userId",protect, resetCustomization);

module.exports = router;
