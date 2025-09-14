const Product = require('../Models/productModel');
const express = require('express');
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/ValidatorRules/productValidator');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductsImages,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getMyProducts,
  
} = require('../Controllers/productController');
//const reviewsRoute = require('./reviewRoute');
const { protect, restrictTo } = require('../Middleware/authMiddleware');

const router = express.Router();

// POST   /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3
//router.use('/:productId/reviews', reviewsRoute);

router
  .route('/')
  .get(getProducts)

  // dont forget : ajouter pour update et create , delete : ( restrictTo('admin', 'superadmin'),)
  .post(
    protect,
uploadProductsImages,
    createProductValidator,
    createProduct  );

// Admin review endpoints
router.get('/pending', protect, restrictTo('admin','superadmin'), getPendingProducts);
router.patch('/:id/approve', protect, restrictTo('admin','superadmin'), approveProduct);
router.patch('/:id/reject', protect, restrictTo('admin','superadmin'), rejectProduct);

// Current user's products
router.get('/mine', protect, getMyProducts);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    protect,
   
    uploadProductsImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    protect,
    deleteProductValidator,
    deleteProduct
  );




  // Route pour obtenir les suggestions (up-sell et cross-sell)
  router.get("/:id/suggestions", protect, async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: "Produit non trouvé" });
      }
  
      const { upsells, crossSells } = await Product.suggestUpsellsAndCrossSells(productId, product.category);
      res.json({ upsells, crossSells });
  
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });
 
module.exports = router;