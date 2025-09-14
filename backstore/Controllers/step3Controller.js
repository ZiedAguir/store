const Step3Model = require("../Models/StepesModeles/step3Model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const factory = require('./handlerFactories');




// @desc    Get Step3 Data by User ID
// @route   GET /api/v1/step3/get-step3/:userId
// @access  Public (ou privé selon votre logique de protection)
exports.getStep3DataById = asyncHandler(async (req, res, next) => {
  const { userId } = req.params; 
  console.log("userId récupéré dans la requête:", userId); 

  // Vérifier si un userId a été fourni
  if (!userId) {
    return next(new ApiError("L'ID de l'utilisateur est requis.", 400));
  }
  // Récupérer les données Step3 pour cet utilisateur
  const step3Data = await Step3Model.findOne({ userId });
  // Vérifier si des données Step3 existent pour cet utilisateur
  if (!step3Data) {
    return next(new ApiError("Aucune donnée Step3 trouvée pour cet utilisateur.", 404));
  }
  // Réponse avec les données Step3
  res.status(200).json({
    message: "Données Step3 récupérées avec succès.",
    data: step3Data,
  });
});


// @desc    Update Step3 Data
// @route   PUT /api/v1/step3/update-step3
// @access  Public
exports.updateStep3Data = asyncHandler(async (req, res, next) => {
  const { selectedPages, formSelections } = req.body; 
  const userId = req.user?.id;

  // Vérifier si l'utilisateur est identifié
  if (!userId) {
    return next(new ApiError("Accès interdit, utilisateur non identifié.", 401));
  }
  // Vérifier que les champs requis sont présents
  if (!selectedPages || !formSelections) {
    return next(
      new ApiError(
        "Les champs 'selectedPages' et 'formSelections' sont requis.",
        400
      )
    );
  }
  // Valider que selectedPages est un tableau
  if (!Array.isArray(selectedPages)) {
    return next(
      new ApiError("'selectedPages' doit être un tableau de chaînes.", 400)
    );
  }

  // Valider que formSelections est un Map ou un objet valide
  if (typeof formSelections !== "object" || Array.isArray(formSelections)) {
    return next(
      new ApiError("'formSelections' doit être un objet ou une Map valide.", 400)
    );
  }

  // Mise à jour ou création des données Step3
  const step3Data = await Step3Model.findOneAndUpdate(
    { userId }, // Filtrer par l'utilisateur
    { selectedPages, formSelections }, // Mettre à jour les champs
    { new: true, upsert: true, runValidators: true } // Créer si inexistant, valider les données
  );

  // Vérifier si les données ont été mises à jour
  if (!step3Data) {
    return next(new ApiError("Impossible de mettre à jour les données Step3.", 500));
  }

  // Réponse réussie
  res.status(200).json({
    message: "Données Step3 mises à jour avec succès.",
    data: step3Data,
  });
});


exports.createStep3Data = asyncHandler(async (req, res, next) => {
  try {
    const { selectedPages, formSelections } = req.body;

    // Vérifier si req.user est défini
    if (!req.user) {
      return next(new ApiError("Utilisateur non authentifié.", 401));
    }

    // Vérifiez si les données de Step3 existent déjà
    const existingStep3 = await Step3Model.findOne({ userId: req.user._id });
    if (existingStep3) {
      // Mise à jour des données existantes
      existingStep3.selectedPages = selectedPages;
      existingStep3.formSelections = formSelections;

      // Sauvegarder les données mises à jour
      await existingStep3.save();
      return res.status(200).json(existingStep3); // Retourner les données mises à jour
    }

    // Si aucune donnée n'existe, créer une nouvelle entrée
    const step3Entry = new Step3Model({
      userId: req.user._id,
      selectedPages,
      formSelections,
    });

    const savedEntry = await step3Entry.save();
    res.status(201).json(savedEntry); 
  } catch (error) {
    console.error("Erreur lors de la création ou mise à jour : ", error.message, error.stack);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});



