const express = require('express');
const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  changeUserPasswordValidator,
  updateMeValidator,
  changeMePasswordValidator,
} = require('../utils/ValidatorRules/userValidator');
const {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getUser,
  uploadUserImage,
  promoteUser,
  getLoggedUserData,
  updateLoggedUserData,
  deleteLoggedUserData,
  updateLoggedUserPassword,
  processUserImage,
  uploadUsersImages,
} = require('../Controllers/userController');
const { protect, restrictTo } = require('../Middleware/authMiddleware');

const router = express.Router();


//@access Private (User only):
router.get('/getMe', protect,getLoggedUserData, getUserById);
router.put('/updateMyPassword' ,protect,changeMePasswordValidator,updateLoggedUserPassword);
router.put('/updateMe', protect,updateMeValidator, updateLoggedUserData);
router.delete('/deleteMe',protect,deleteLoggedUserData,deleteLoggedUserData);

//@access Private (Admin only):
router.put(
  '/changeUserPassword/:id',
  changeUserPasswordValidator,
  changeUserPassword
);
router.get( '/', protect,restrictTo('admin', 'superadmin'), getUser);
router.post(
  '/create-user',
  protect, 
  restrictTo('admin', 'superadmin'), 
  uploadUsersImages, 
  createUserValidator, 
  createUser 
);
router
  .route('/:id')
  //don't foreget to use protect an restricto in this route get:
  .get( getUserValidator, getUserById)
  .put(
    protect,
    restrictTo('admin', 'superadmin'),
    updateUserValidator,
    updateUser
  )
  .delete(protect, restrictTo('admin', 'superadmin'), deleteUserValidator, deleteUser);

// Route for promoting users (Admin/Superadmin only)
router.put(
  '/:id/promote',
  protect,
  restrictTo('admin', 'superadmin'),
  promoteUser
);

module.exports = router;
