require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env
const cloudinary = require('cloudinary').v2; 

// Configuration de Cloudinary avec les informations d'identification
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;  
