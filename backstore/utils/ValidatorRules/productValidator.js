

const { check, body,Result } = require('express-validator');
const validatorMiddleware = require('../../Middleware/validatorMiddleware.js');
const categoryModel = require('../../Models/categoryModel');
const { default: slugify } = require('slugify');
const subCategoryModel = require('../../Models/subCategoryModel.js');

exports.getProductValidator = [
// 1- rules:
check('id').isMongoId().withMessage('Invalid product id format'),
validatorMiddleware,
];

exports.createProductValidator = [
    check('title')
    .notEmpty().withMessage('title product is required')
    .isLength({min: 3 }).withMessage('too short product name')
    .custom((val,{req}) => {
        req.body.slug = slugify(val);
        return true;
    }),

    check('description')
    .notEmpty().withMessage('description product is required')
    .isLength({max: 2000 }).withMessage('too long product description'),

    check('quantity')
    .notEmpty().withMessage('quantity product is required')
    .isNumeric().withMessage(' product quantity must be a Number'),

    check('sold')
    .optional()
    .isNumeric().withMessage(' product quantity must be a Number'),

    check('price')
  .notEmpty().withMessage('price product is required')
  .isNumeric().withMessage('product price must be a Number')
  .custom((value) => {
    if (Array.isArray(value)) {
      throw new Error('price must be a single number, not an array');
    }
    return true;
  })
  .isLength({ max: 32 }).withMessage('too long price'),

    check('priceAfterDiscount')
    .optional()
    .isNumeric().withMessage('product priceAfterDiscount must be a Number')
    .toFloat()// 90.5 ==> 90
    .custom((value, {req})=>{
        // req.body.price < value ==> price(price after discount) < value(Price before discount)
        if(req.body.price < value) {
            throw new Error('priceAfterDiscount must be a Number');
        }
        return true;
    }),

    check('colors')
    .optional()
    .isArray().withMessage('colors should be array of string '),
    // imageCover optional: allow product without an image at creation
    check('imageCover')
    .optional(),
    check('Images')
    .optional()
    .isArray().withMessage('Images should be array of string '),
    check('category')
    .notEmpty().withMessage('category product is required')
    .isMongoId().withMessage('Invalid ID formate')
   .custom((categoryId) => categoryModel.findById(categoryId).then((category)=>{
        if(!category) {
            return Promise.reject(
                 new Error(`No category for this id: ${categoryId}`));
       }
   })) ,
    check('subcategories')
    .optional()
    .isMongoId().withMessage('Invalid ID formate')
    //validation subcategories in db
    .custom((subCategoriesIds) => 
    subCategoryModel.find({_id: {$exists:true, $in:subCategoriesIds}}).then(
        (result) => {
            console.log(result.length)
            if(result.length < 1 || result.length !== subCategoriesIds.length ) {
                return Promise.reject(
                    new Error(`Invalid subCategories Ids`));
            }
      }
   )
    )
    //validation subcategories belong category
   .custom((val, {req}) => 
            //etape 1 :
             subCategoryModel.find({category:req.body.category}).then(
            (subCategories) => {
             const subCategoriesIdsInDb = [];
            // etape 2 :
             subCategories.forEach((subcategory) => {
                subCategoriesIdsInDb.push((subcategory._id.toString()));
            })
            // etape 3:
            if(!val.every((id) => subCategoriesIdsInDb.includes(id))){
                return Promise.reject(
                    new Error(`subcategories not belong to category`));
           }
        }
    ) ),
    check('brand')
    .optional()
    .isMongoId().withMessage('Invalid ID formate')
   ,
    check('ratingsAverage')
    .optional()
    .isNumeric().withMessage('ratingsAverage must be a Number')
    .isLength({min: 1 }).withMessage('ratingsAverage must be a number equal a 1.0')
    .isLength({max: 5 }).withMessage('ratingsAverage must be a number equal a 5.0'),
    check('ratingsQuantity')
    .optional()
    .isNumeric().withMessage('ratingsQuantity must be a Number'),

    validatorMiddleware,
];

exports.updateProductValidator = [
    // 1- rules:
    check('id').isMongoId().withMessage('product not updated '),
    body('title').optional()
    .custom((val,{req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware,
    ];


exports.deleteProductValidator = [
    // 1- rules:
    check('id').isMongoId().withMessage('product not deleted'),
    validatorMiddleware,
    ];