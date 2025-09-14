const asyncHandler = require("express-async-handler");
const step1Model = require("../Models/StepesModeles/step1Model");
const userModel = require("../Models/user");
const ApiError = require("../utils/apiError");
const factory = require('./handlerFactories');




// @desc    Get list of Step1 data
// @route   GET /api/v1/step1
// @access  Public
exports.getAllStep1Data = factory.getAll(step1Model);

// @desc    Get Step1 Data by ID
// @route   GET /api/v1/step1/:id
// @access  Public
exports.getStep1DataById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log("ID récupéré dans la requête:", id); 

  // Vérifier si un ID a été fourni
  if (!id) {
    return next(new ApiError("L'ID de l'utilisateur est requis.", 400));
  }
  const step1Data = await step1Model.findOne({ userId: id }); 
  if (!step1Data) {
    return next(new ApiError("Aucune donnée Step1 trouvée pour cet utilisateur.", 404));
  }
  res.status(200).json({
    message: "Données Step1 récupérées avec succès.",
    data: step1Data,
  });
});

// @desc    Save Step1 Data
// @route   POST /api/v1/step1/create-step1
// @access  Public
exports.saveStep1Data = asyncHandler(async (req, res, next) => {
  const { fullname, email, phone, address, trafic, rating, discipline, status } = req.body;

  // Vérifier si l'utilisateur existe
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ApiError("Utilisateur introuvable avec cet email.", 404));
  }

  // Vérifier si les données de Step1 existent déjà pour cet utilisateur
  const existingStep1 = await step1Model.findOne({ userId: user._id });
  if (existingStep1) {
    return next(new ApiError("Les données de Step1 pour cet utilisateur existent déjà.", 400));
  }

  // Enregistrer les données de Step1
  const step1Data = await step1Model.create({
    userId: user._id,
    fullname,
    email,
    phone,
    address,
    trafic,
    rating,
    discipline,
    status,
  });

  res.status(201).json({
    message: "Données sauvegardées avec succès",
    data: step1Data,
  });
});

// @desc    Update Step1 Data
// @route   PUT /api/v1/step1/update-step1
// @access  Public
exports.updateStep1Data = asyncHandler(async (req, res, next) => {
  const { fullname, email, phone, address, trafic, rating, discipline, status } = req.body;

  // Vérifier si l'utilisateur existe
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ApiError("Utilisateur introuvable avec cet email.", 404));
  }

  // Mettre à jour ou créer les données de Step1
  const step1Data = await step1Model.findOneAndUpdate(
    { userId: user._id },
    { fullname, email, phone, address, trafic, rating, discipline, status },
    { new: true, upsert: true } // Crée si non trouvé
  );

  res.status(200).json({
    message: "Données mises à jour avec succès",
    data: step1Data,
  });
});


// @desc    Delete Step1 Data
// @route   DELETE /api/v1/step1/:id
// @access  Public
exports.deleteStep1Data = factory.deleteOne(step1Model);

  


