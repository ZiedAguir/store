const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// 1- Create schema :
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'name required'],
  },

  slug: {
    type: String,
    lowercase: true,
  },

  email: {
    type: String,
    trim: true,
    required: [true, 'email required'],
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
  },

  country: {
    type: String,
    trim: true,
  },

  profileImg: {
    type: String,
  },
  images: {
    type: [String], // Array of image URLs (strings)
    required: true,
  },
  Projects:{
type: String,
  },
  language:{
    type:String,
  },
  about:{
    type:String,
  },
  addresseProfil:{
    type: String,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password required'],
    minLength: [6, 'too short password'],
  },
  refreshToken: { type: String }, 
  passwordChangeAt: Date,
  passwordResetCode: String,
  passwordResetExpires: Date,
  passwordResetVerified: Boolean,
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },
  // child reference (one to many)
  wishlist: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  addresses: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      alias: String,
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },

  // MFA Fields
  isVerified: {
    type: Boolean,
    default: false, // To track if email is verified
  },

  mfaCode : {
    type: String, 
  },

  mfaExpires: {
    type: Date,  
  },
 
},

{ timestamps: true });

// Haching password to create a User
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Methods for MFA
userSchema.methods.generateMfaToken = async function () {
  // Generate a random token 
  const token = Math.floor(100000 + Math.random() * 900000).toString(); 
  this.mfaToken = token;
  this.mfaExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  await this.save(); 
  return token;
};

userSchema.methods.verifyMfaToken = function (token) {
  // Check if the token matches and has not expired
  return this.mfaToken === token && this.mfaExpires > Date.now();
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
