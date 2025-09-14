const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../Models/user');
const {sendEmail} = require('../utils/Email/sendEmail');
const crypto = require('crypto');
const { createTokens } = require('../utils/tokenUtils/tokenUtils');
const https = require('https');


// @desc Signup for normal users (role always set to "user")
// @route POST /api/v1/auth/signup
// @access public
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, country } = req.body; 

  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ApiError('Email already in use', 400));
  }

  // Role is always "user" for regular signup
  const role = 'user';

  const user = await User.create({
    name,
    email,
    password,
    country,
    role,
  });

  // Générer les tokens
  const { accessToken, refreshToken } = createTokens(user._id);
  // Stocker le refresh token dans la base de données
  user.refreshToken = refreshToken;
  await user.save();

  // Configurer les cookies pour le refresh token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // Répondre avec les données utilisateur et le token d'accès
  res.status(201).json({
    data: user,
    accessToken,
    message: 'User signed up successfully',
  });
});



// @desc Signup for superadmin (restricted to existing superadmin )
// @route POST /api/v1/auth/signup-superadmin
// @access Restricted (only for existing superadmins )
exports.signupSuperAdmin = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;


  // Vérifier si l'email est déjà utilisé
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ApiError('Email already in use', 400));
  }

  // Créer un nouveau superadmin
  const superAdmin = await User.create({
    name,
    email,
    password,
    role: 'superadmin',
  });

  // Générer les tokens
  const { accessToken, refreshToken } = createTokens(superAdmin._id);

  // Stocker le refresh token dans la base de données
  superAdmin.refreshToken = refreshToken;
  await superAdmin.save();

  // Configurer les cookies pour le refresh token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(201).json({
    data: superAdmin,
    accessToken,
    message: 'Superadmin signed up successfully',
  });
});



// @desc Login
// @route POST /api/v1/auth/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found for email:', email);
    return next(new ApiError('Incorrect email or password', 401));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new ApiError('Incorrect email or password', 401));
  }
  const mfaCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.mfaCode = mfaCode;
  user.mfaExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  console.log(`Generated MFA code for ${email}: ${mfaCode}`);

  await sendEmail(user.email, 'Your MFA Code', `Your MFA code is: ${mfaCode}`);

  res.status(200).json({
    message: 'MFA code sent to your email. Please verify to proceed.',
    role: user.role,
  });
});

// @desc Logout
// @route POST /api/v1/auth/logout
// @access private
exports.logout = asyncHandler(async (req, res, next) => {
  const userId = req.user.id; 

  // Supprimez le refresh token de la base de données
  await User.findByIdAndUpdate(userId, { refreshToken: null });

  // Effacez les cookies
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc Verify MFA and generate token
// @route POST /api/v1/auth/verify-mfa
// @access public
exports.verifyMfa = asyncHandler(async (req, res, next) => {
  const { email, mfaCode } = req.body;

  // Rechercher l'utilisateur par email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError('Invalid email or MFA code', 401));
  }

  // Vérifier le code MFA et son expiration
  if (user.mfaCode !== mfaCode || user.mfaExpires < Date.now()) {
    return next(new ApiError('Invalid or expired MFA code', 401));
  }

  // Générer les tokens
  const { accessToken, refreshToken } = createTokens(user._id);

  // Stocker le refresh token dans la base de données
  user.refreshToken = refreshToken;
  user.mfaCode = null; 
  user.mfaExpires = null;
  await user.save();

  // Configurer les cookies pour le refresh token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // Répondre avec l'accessToken et le rôle de l'utilisateur
  res.status(200).json({
    accessToken,
    role: user.role, 
    message: 'MFA verified successfully',
  });
});


// @desc Refresh Access Token
// @route POST /api/v1/auth/refresh-token
// @access public
exports.refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new ApiError('Refresh token is required', 401));
  }

  try {
    // Vérifiez la validité du refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

    // Récupérez l'utilisateur associé
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return next(new ApiError('Invalid refresh token', 401));
    }

    // Générez un nouveau access token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error('Error verifying refresh token:', err);
    return next(new ApiError('Invalid or expired refresh token', 401));
  }
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`No user found with email: ${req.body.email}`, 404));
  }

  // 2) Generate and save the reset code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(resetCode);
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  user.passwordResetVerified = false;
  await user.save();

  // 3) Check if email is defined and send the reset code
  if (!user.email) {
    return next(new ApiError('User email is not defined', 400));
  }

  const message = `Hi ${user.name},We received a request to reset the password on your Email Account.Your reset code is: ${resetCode},Enter this code to complete the reset.Thanks for helping us keep your account secure`;

  try {
    // Utilisation de la fonction sendEmail
    await sendEmail( user.email, message);

    res.status(200).json({ status: 'Success', message: 'Reset code sent to email'});
  } catch (error) {
    console.error('Error sending email:', error);

    // Reset fields in case of error
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    return next(new ApiError('Error in sending email', 500));
  }
});


// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');
    console.log('Hashed Reset Code:', hashedResetCode);
  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError('Reset code invalid or expired'));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: 'Success',
  });
});


// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }

  // 3) Update the password and clear reset fields
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 4) Generate tokens
  const { accessToken, refreshToken } = createTokens(user._id);

  // 5) Store the refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  // 6) Configure cookies for the refresh token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // 7) Respond with access token and success message
  res.status(200).json({
    message: 'Password reset successfully',
    accessToken,
  });
});



// @desc    Sign in with Google (ID token)
// @route   POST /api/v1/auth/google
// @access  Public
exports.googleLogin = asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) {
    return next(new ApiError('Google ID token is required', 400));
  }

  const verifyToken = () => new Promise((resolve, reject) => {
    try {
      const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
      https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => { data += chunk; });
        resp.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (resp.statusCode !== 200 || json.error_description) {
              return reject(new Error(json.error_description || 'Invalid Google token'));
            }
            resolve(json);
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', (err) => reject(err));
    } catch (e) {
      reject(e);
    }
  });

  let payload;
  try {
    payload = await verifyToken();
  } catch (err) {
    return next(new ApiError('Failed to verify Google token', 401));
  }

  const email = payload.email;
  const name = payload.name || (email ? email.split('@')[0] : 'Google User');
  const picture = payload.picture;

  let user = await User.findOne({ email });
  if (!user) {
    const randomPassword = crypto.randomBytes(16).toString('hex');
    user = await User.create({
      name,
      email,
      password: randomPassword,
      profileImg: picture,
      images: [],
      role: 'user',
      isVerified: true,
    });
  }

  const { accessToken, refreshToken } = createTokens(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    accessToken,
    role: user.role,
    data: user,
    message: 'Google sign-in successful',
  });
});

  