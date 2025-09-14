const Customization = require("../Models/CustomizationColor/customization");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

// @desc    Récupérer la personnalisation d'un utilisateur
// @route   GET /api/v1/customization/get-customise/:userId
// @access  Public
exports.getCustomizationByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
 // console.log("User ID récupéré dans la requête:", userId);

  if (!userId) {
    return next(new ApiError("L'ID de l'utilisateur est requis.", 400));
  }

  const settings = await Customization.findOne({ userId });

  if (!settings) {
    return next(new ApiError("Aucune personnalisation trouvée pour cet utilisateur.", 404));
  }

  res.status(200).json({
    message: "Personnalisation récupérée avec succès.",
    data: settings,
  });
});

// @desc    Sauvegarder ou mettre à jour la personnalisation d'un utilisateur
// @route   PUT /api/v1/customization/update-customise
// @access  Public
exports.updateCustomization = asyncHandler(async (req, res, next) => {
  const { settings } = req.body;
  const userId = req.user?.id;
  if (!userId || !settings) {
    return next(new ApiError("Les champs userId et settings sont requis.", 400));
  }

  const updatedSettings = await Customization.findOneAndUpdate(
    { userId },
    { $set: settings },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    message: "Personnalisation mise à jour avec succès.",
    data: updatedSettings,
  });
});

// @desc    Réinitialiser la personnalisation d'un utilisateur
// @route   DELETE /api/v1/customization/delete-customise/:userId
// @access  Public
exports.resetCustomization = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new ApiError("L'ID de l'utilisateur est requis.", 400));
  }

  await Customization.deleteOne({ userId });

  res.status(200).json({
    message: "Personnalisation réinitialisée avec succès.",
  });
});

  