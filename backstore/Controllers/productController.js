  const factory = require('./handlerFactories');
const Product = require('../Models/productModel');
const User = require('../Models/user'); // This imports the 'user' model
const { uploadMixOfImages, handleMixOfImageUploads } = require('../Middleware/uploadImageMiddleware');
const NodeCache = require("node-cache");
const ApiFeatures = require('../utils/apiFeatures');
const ApiError = require('../utils/apiError');
const cache = new NodeCache({ stdTTL: 600 });
// Example fields configuration
const fieldsConfig = [
  { name: 'imageCover', maxCount: 1, entityType: 'products' },
  { name: 'images', maxCount: 5, entityType: 'products' },
];
// Middleware usage in routes
exports.uploadProductsImages =( [
  uploadMixOfImages(fieldsConfig),
  handleMixOfImageUploads(fieldsConfig),
]);
// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    // Only return approved products for public listing; include legacy (no status)
    const publicFilter = { $or: [ { approvalStatus: 'approved' }, { approvalStatus: { $exists: false } } ] };
    const countDocument = await Product.countDocuments(publicFilter);
    const apiFeatures = new ApiFeatures(Product.find(publicFilter), req.query)
      .filter()
      .sort()
      .limitFields()
      .search('products')
      .paginate(countDocument);

    // Populate creator field to get user information
    const products = await apiFeatures.mongooseQuery.populate({
      path: 'creator',
      select: 'name role _id',
      model: 'user'
    });

    // Debug: Log some product data to see creator field
    console.log('Products with creators:', products.slice(0, 2).map(p => ({
      id: p._id,
      title: p.title,
      creator: p.creator
    })));

    res.status(200).json({
      results: products.length,
      paginationResult: apiFeatures.paginationResult,
      data: products,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Fetching product with ID: ${id}`);
    
    // Check if the ID is a valid MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`Invalid ObjectId format: ${id}`);
      return next(new ApiError(`Invalid product ID format: ${id}`, 400));
    }
    
    const product = await Product.findById(id)
      .populate({
        path: 'creator',
        select: 'name role _id',
        model: 'user'
      })
      .populate({
        path: 'reviews',
        options: { strictPopulate: false }
      });
    
    console.log(`Product found:`, product ? 'Yes' : 'No');
    
    
    if (!product) {
      return next(new ApiError(`No product found for ID ${id}`, 404));
    }
    
    res.status(200).json({ data: product });
  } catch (error) {
        console.error('Error fetching product:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      return next(new ApiError(`Invalid product ID format: ${req.params.id}`, 400));
    }
    
    // Handle populate errors
    if (error.name === 'ValidationError') {
      return next(new ApiError(`Validation error: ${error.message}`, 400));
    }
    
    // Handle other database errors
    next(new ApiError(`Internal server error: ${error.message}`, 500));
  }
};

// @desc    Debug product by id (temporary endpoint for debugging)
// @route   GET /api/v1/products/debug/:id
// @access  Public
exports.debugProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    console.log(`Debug - Fetching product with ID: ${id}`);
    
    // Check if the ID is a valid MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid product ID format: ${id}`,
        debug: {
          id,
          isValidFormat: false,
          expectedFormat: '24 character hexadecimal string'
        }
      });
    }
    
    // Try to find the product without populate first
    const productBasic = await Product.findById(id);
    console.log(`Debug - Basic product found:`, productBasic ? 'Yes' : 'No');
    
    if (!productBasic) {
      return res.status(404).json({
        status: 'error',
        message: `No product found for ID ${id}`,
        debug: {
          id,
          isValidFormat: true,
          productExists: false
        }
      });
    }
    
    // Try with populate
    const productWithCreator = await Product.findById(id)
      .populate({
        path: 'creator',
        select: 'name role _id',
        model: 'user'
      });
    
    const productWithReviews = await Product.findById(id)
      .populate({
        path: 'reviews',
        options: { strictPopulate: false }
      });
    
    res.status(200).json({
      status: 'success',
      debug: {
        id,
        isValidFormat: true,
        productExists: true,
        basicProduct: {
          id: productBasic._id,
          title: productBasic.title,
          creator: productBasic.creator,
          reviews: productBasic.reviews
        },
        withCreator: productWithCreator ? 'Success' : 'Failed',
        withReviews: productWithReviews ? 'Success' : 'Failed'
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      debug: {
        errorName: error.name,
        errorStack: error.stack
      }
    });
  }
};

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = async (req, res, next) => {
  try {
    // Normalize and coerce incoming fields from FormData/JSON
    const body = { ...req.body };
    // Coerce numbers
    const numberFields = ['price', 'priceAfterDiscount', 'quantity', 'weight', 'ratingsAverage', 'ratingsQuantity', 'menuOrder'];
    numberFields.forEach((key) => {
      if (body[key] !== undefined && body[key] !== null && body[key] !== '') {
        const parsed = key === 'ratingsQuantity' || key === 'quantity' || key === 'menuOrder'
          ? parseInt(body[key])
          : parseFloat(body[key]);
        if (!Number.isNaN(parsed)) body[key] = parsed;
      }
    });
    // Coerce nested dimensions if sent as string
    if (typeof body.dimensions === 'string') {
      try { body.dimensions = JSON.parse(body.dimensions); } catch { body.dimensions = { length: 0, width: 0, height: 0 }; }
    }
    // Ensure arrays
    const coerceArray = (val) => (Array.isArray(val) ? val : (val === undefined || val === null || val === '' ? [] : [val]));
    body.colors = coerceArray(body.colors);
    body.sizes = coerceArray(body.sizes);
    body.subcategories = coerceArray(body.subcategories);
    // Basic required checks to avoid vague errors
    if (!body.title || !body.description || body.description.length < 20) {
      return next(new ApiError('Title and description (min 20 chars) are required', 400));
    }
    if (body.price === undefined || Number.isNaN(body.price)) {
      return next(new ApiError('Valid price is required', 400));
    }
    if (!body.category) {
      return next(new ApiError('Category is required', 400));
    }
    // Add the creator field from the authenticated user
    const productData = { ...body, creator: req.user._id };
    
    const product = await Product.create(productData);
    
    res.status(201).json({
      status: "success",
      data: product
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

// @desc    Get current user's products (any status)
// @route   GET /api/v1/products/mine
// @access  Private
exports.getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ creator: req.user._id })
      .select('+approvalStatus +rejectionReason +reviewedAt +reviewedBy')
      .populate({ path: 'reviewedBy', select: 'name email _id', model: 'user' })
      .sort({ createdAt: -1 });
    res.status(200).json({ results: products.length, data: products });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

// Admin: List pending products
// @route   GET /api/v1/products/pending
// @access  Admin/Superadmin
exports.getPendingProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ approvalStatus: 'pending' })
      .populate({ path: 'creator', select: 'name email role _id', model: 'user' })
      .sort({ createdAt: -1 });
    res.status(200).json({ results: products.length, data: products });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

// Admin: Approve a product
// @route   PATCH /api/v1/products/:id/approve
// @access  Admin/Superadmin
exports.approveProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next(new ApiError(`No product found for ID ${id}`, 404));

    product.approvalStatus = 'approved';
    product.rejectionReason = undefined;
    product.reviewedBy = req.user._id;
    product.reviewedAt = new Date();
    await product.save();

    res.status(200).json({ data: product });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

// Admin: Reject a product with reason
// @route   PATCH /api/v1/products/:id/reject
// @access  Admin/Superadmin
exports.rejectProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const product = await Product.findById(id);
    if (!product) return next(new ApiError(`No product found for ID ${id}`, 404));
    if (!reason || reason.trim().length < 4) return next(new ApiError('Rejection reason is required', 400));

    product.approvalStatus = 'rejected';
    product.rejectionReason = reason.trim();
    product.reviewedBy = req.user._id;
    product.reviewedAt = new Date();
    await product.save();

    res.status(200).json({ data: product });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    // Check if user can update the product
    const product = await Product.findById(id);
    if (!product) {
      return next(new ApiError(`No product found for ID ${id}`, 404));
    }

    // Only product creator, admin, or superadmin can update
    const canUpdate = 
      (product.creator && product.creator.toString() === req.user._id.toString()) || 
      req.user.role === 'admin' || 
      req.user.role === 'superadmin';
    
    if (!canUpdate) {
      return next(new ApiError('You do not have permission to update this product', 403));
    }

    // Récupérer les catégories liées automatiquement
    const relatedCategories = await Product.suggestRelatedCategories(category);
    const productData = {
      ...req.body,
      relatedCategories,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};
// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return next(new ApiError(`No product found for ID ${id}`, 404));
    }
    
    // Check if user can delete the product
    // Only product creator, admin, or superadmin can delete
    const canDelete = 
      (product.creator && product.creator.toString() === req.user._id.toString()) || 
      req.user.role === 'admin' || 
      req.user.role === 'superadmin';
    
    if (!canDelete) {
      return next(new ApiError('You do not have permission to delete this product', 403));
    }
    
    await Product.findByIdAndDelete(id);
    
    res.status(200).json({
      status: 'success',
      message: `Product with ID ${id} has been deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

// Fonction pour suggérer les produits en cross-sell et up-sell
exports.suggestUpsellsAndCrossSells = async (productId, categoryId) => {
  try {
    // Vérifier si les suggestions sont déjà en cache
    const cacheKey = `suggestions_${productId}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData;

    // Récupérer le produit principal
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Produit non trouvé");
    }
    if (!categoryId) return { upsells: [], crossSells: [] };
    const upsells = await Product.find({
      category: categoryId,
      price: { $gt: product.price },
    }).limit(5);

    const crossSells = await Product.find({
      category: { $in: product.relatedCategories || [] }, 
      price: { $lt: product.price },
    }).limit(5);

    // Sauvegarde dans le cache
    const suggestions = { upsells, crossSells };
    cache.set(cacheKey, suggestions);

    return suggestions;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des suggestions : ${error.message}`);
  }
};
