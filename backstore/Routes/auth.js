const express = require('express');
const { 
  signUpValidator, 
  loginValidator 
} = require('../utils/ValidatorRules/authValidator');
const { 
  signup, 
  login, 
  verifyMfa, 
  refreshToken, 
  logout, 
  signupSuperAdmin,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
  googleLogin,
} = require('../Controllers/authController');
const { protect, restrictTo } = require('../Middleware/authMiddleware');

const router = express.Router();

// Inscription pour les utilisateurs normaux
router.route('/signup')
  .post(signUpValidator, signup);
// Inscription pour superadmins
//Remarque: utilser le methode proteced et restricto pour securite le route de superadmin avant le deployment
router.route('/signup-superadmin')
  .post(signUpValidator, signupSuperAdmin);

router.route('/login')
  .post(loginValidator, login);

router.route('/logout')
  .post(protect,logout);

router.route('/forgotPassword')
  .post(forgotPassword);

router.route('/verifyResetCode')
  .post(verifyPassResetCode);

router.route('/resetPassword')
  .post(resetPassword);

router.route('/verify-mfa')
  .post(verifyMfa);
  
router.route('/refresh-token')
  .post(refreshToken);

// Google OAuth (ID token)
router.route('/google')
  .post(googleLogin);




module.exports = router;

