const mongoose = require("mongoose");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 });
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short product description"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    salePrice: { type: Number },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    sizes: [String],
    sku: { type: String },
    stockStatus: {
      type: String,
      enum: ["in-stock", "out-of-stock", "on-backorder"],
      default: "in-stock",
    },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    shippingClass: {
      type: String,
      enum: ["no-shipping-class", "international", "national"],
      default: "no-shipping-class",
    },
    upSells: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    crossSells: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    attributes: [
      {
        name: { type: String },
        values: [{ type: String }],
        visible: { type: Boolean, default: true },
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, 'Product must be belong to category'],

    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
     },
    ],
    relatedCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    purchaseNote: { type: String },
    menuOrder: { type: Number },
    images: [{ type: String }],
    imageCover: {
      type: String,
      // optional: allow creating products without an image
      required: false,
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    // Product creator field
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: false, // Temporarily not required for existing products
    },
    // Approval workflow fields
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    rejectionReason: {
      type: String,
    },
    reviewedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "review",
  foreignField: "product",
  localField: "_id",
});
// méthode statique pour récupérer les suggestions
productSchema.statics.suggestUpsellsAndCrossSells = async function (productId, categoryId) {
  const cacheKey = `suggestions_${productId}_${categoryId}`;
  const cachedData = cache.get(cacheKey);
 // console.log(cachedData);

  if (cachedData) return cachedData;

  const product = await this.findById(productId);
  if (!product) throw new Error("Produit non trouvé");

  const relatedCategories = Array.isArray(product.relatedCategories) ? product.relatedCategories : [];

  // Optimisation : Trier et indexer pour accélérer la requête
  let upsells = await this.find({ category: categoryId, price: { $gt: product.price } })
    .sort({ price: 1 }) 
    .limit(5)
    .populate("category", "name")
    .populate("brand", "name")
    .select("title price imageCover stockStatus description ratingsAverage priceAfterDiscount rating")
    .lean();

  let crossSells = await this.find({
    category: { $in: relatedCategories.length ? relatedCategories : [categoryId] },
    price: { $lt: product.price },
  })
    .sort({ price: -1 }) 
    .limit(5)
    .populate("category", "name")
    .populate("brand", "name")
    .select("title price imageCover description stockStatus ratingsAverage priceAfterDiscount rating")
    .lean();

  // Fallback si pas de suggestions trouvées
  if (upsells.length === 0) {
    upsells = await this.find({ category: categoryId })
      .sort({ ratingsAverage: -1 }) 
      .limit(5)
      .populate("category", "name")
      .populate("brand", "name")
      .select("title price imageCover stockStatus description ratingsAverage priceAfterDiscount rating")
      .lean();
  }

  if (crossSells.length === 0) {
    crossSells = await this.find({})
      .sort({ ratingsAverage: -1 }) 
      .limit(5)
      .populate("category", "name")
      .populate("brand", "name")
      .select("title price imageCover description stockStatus ratingsAverage priceAfterDiscount rating")
      .lean();
  }

  const suggestions = { upsells, crossSells };

  cache.set(cacheKey, suggestions);

  return suggestions;
};



// Méthode statique pour suggérer des catégories liées
productSchema.statics.suggestRelatedCategories = async function (categoryId) {
  const category = await mongoose.model("Category").findById(categoryId);
  if (!category) throw new Error("Catégorie non trouvée");

  // Récupérer les catégories liées :
  const relatedCategories = await mongoose.model("Category").find({
    parentCategory: category.parentCategory, 
    _id: { $ne: categoryId }, 
  }).limit(5);

  return relatedCategories.map(cat => cat._id);
};

module.exports = mongoose.model("Product", productSchema);
