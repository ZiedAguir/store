const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../Models/user");

// @desc Middleware to protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Vérifier le token dans les cookies ou dans l'en-tête d'autorisation
  if (req.cookies.refreshToken) {
    token = req.cookies.refreshToken; 
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("No token found");
    return next(
      new ApiError("You are not logged in! Please log in to get access.", 401)
    );
  }

  try {
    // 2- verify token (no change happens( payload ) , expired token ( JWT_SECRET_KEY ))
    const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
    //console.log(decoded);
    // Récupérer l'utilisateur correspondant au token
    const currentUser = await User.findById(decoded.userId).select("-password");
    if (!currentUser) {
      console.log("User not found:", decoded.userId);
      return next(
        new ApiError("The user belonging to this token no longer exists.", 401)
      );
    }

    // Vérifier si l'utilisateur a récemment changé son mot de passe
    if (currentUser.passwordChangeAt) {
      const passwordChangeTimestamp = parseInt(
        currentUser.passwordChangeAt.getTime() / 1000,
        10
      );
      if (passwordChangeTimestamp > decoded.iat) {
        return next(
          new ApiError(
            "User recently changed password! Please log in again.",
            401
          )
        );
      }
    }

    // Ajouter l'utilisateur à la requête
    req.user = currentUser;
    next();
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return next(new ApiError("Token is invalid or expired", 401));
  }
});

// @desc Middleware to restrict access to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
