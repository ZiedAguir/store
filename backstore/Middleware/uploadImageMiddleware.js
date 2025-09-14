const multer = require('multer');
const fs = require("fs");
const ApiError = require('../utils/apiError');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../config/cloudinaryConfig');
const expressAsyncHandler = require('express-async-handler');

// Multer configuration for memory storage
const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only image files are allowed', 400), false);
    }
  };

  return multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
  });
};

// Middleware to upload single or multiple images
exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

// Middleware to upload a mix of images
exports.uploadMixOfImages = (fieldsConfig) => {
  const multerFields = fieldsConfig.map((field) => ({ name: field.name, maxCount: field.maxCount }));
  return multerOptions().fields(multerFields);
};


// Common logic for processing and uploading an image to Cloudinary
const processAndUploadImage = async (buffer, folder, uniqueFilename) => {
  // Resize the image using Sharp
  const processedBuffer = await sharp(buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  // Upload to Cloudinary
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: uniqueFilename, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(processedBuffer);
  });
};

// Middleware to handle single image upload, process, and save
exports.handleSingleImageUpload = (fieldName) =>
  expressAsyncHandler(async (req, res, next) => {
    if (!req.file) {
      // Optional upload: if no file provided, continue without error
      return next();
    }
    try {
      const uniqueFilename = `${fieldName}-${uuidv4()}-${Date.now()}`;
      const imageUrl = await processAndUploadImage(req.file.buffer, fieldName, uniqueFilename);

      // Attach the image URL to the request body
      req.body[fieldName] = imageUrl;
      next();
    } catch (error) {
      console.error('Error uploading single image:', error.message);
      throw new ApiError('Image upload failed.', 500);
    }
  });


// Middleware to handle multiple image uploads, process, and save
exports.handleMixOfImageUploads = (fieldsConfig) =>
  expressAsyncHandler(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      // Optional upload: if no files provided, continue without error
      return next();
    }

    try {
     console.log('Uploaded files:', req.files); 

      for (const field of fieldsConfig) {
        const { name, entityType, maxCount } = field;

        if (req.files[name]) {
          if (maxCount === 1) {
            // Single image upload
            const uniqueFilename = `${entityType}-${uuidv4()}-${Date.now()}-${name}`;
            const result = await processAndUploadImage(
              req.files[name][0].buffer,
              `${entityType}/${name}`,
              uniqueFilename
            );
            req.body[name] = result; 
          } else {
            // Multiple images upload
            req.body[name] = [];
            await Promise.all(
              req.files[name].map(async (file, index) => {
                const uniqueFilename = `${entityType}-${uuidv4()}-${Date.now()}-${name}-${index + 1}`;
                const result = await processAndUploadImage(
                  file.buffer,
                  `${entityType}/${name}`,
                  uniqueFilename
                );
                req.body[name].push(result); 
              })
            );
          }
        } else {
          console.warn(`Field "${name}" not found in uploaded files.`);
        }
      }

      next();
    } catch (error) {
      console.error('Error processing and uploading images:', error.message);
      throw new ApiError('Failed to process and upload images.', 500);
    }
  });


