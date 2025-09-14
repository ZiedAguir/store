const { uploadSingleImage,handleSingleImageUpload } = require("../Middleware/uploadImageMiddleware");
const step2Model = require("../Models/StepesModeles/step2Model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");


// Middleware to upload and handle a single user image
exports.uploadStep2Image = uploadSingleImage('logo'); 
exports.processStep2Image = handleSingleImageUpload('logo');
// @desc    Update Step2 Data
// @route   PUT /api/v1/step2/update-step2
// @access  Public
exports.updateStep2Data = asyncHandler(async (req, res, next) => {
    const { slogan, description, column, domain } = req.body;
      const userId = req.user?.id;
    if (!userId) {
      return next(new ApiError("Accès interdit, utilisateur non identifié.", 401));
    }
    let logoUrl = req.body.logo; 
  if (req.body.profileImg) {
    logoUrl = req.body.profileImg; 
  }
      const step2Data = await step2Model.findOneAndUpdate(
      { userId }, 
      { logo: logoUrl, slogan, description, column, domain },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({
      message: "Données mises à jour avec succès",
      data: step2Data,
    });
  });

  // @desc    Get Step1 Data by ID
// @route   GET /api/v1/step2/:id
// @access  Public
exports.getStep2DataById = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Extraire `id` au lieu de `userId`
  console.log("ID récupéré dans la requête:", id); 

  // Vérifier si un ID a été fourni
  if (!id) {
    return next(new ApiError("L'ID de l'utilisateur est requis.", 400));
  }

  // Récupérer les données Step2 pour cet utilisateur
  const step2Data = await step2Model.findOne({ userId: id }); // Utiliser `userId: id`

  // Vérifier si des données Step2 existent pour cet utilisateur
  if (!step2Data) {
    return next(new ApiError("Aucune donnée Step2 trouvée pour cet utilisateur.", 404));
  }

  // Réponse avec les données Step2
  res.status(200).json({
    message: "Données Step2 récupérées avec succès.",
    data: step2Data,
  });
});