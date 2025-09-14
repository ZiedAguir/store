

const { check, body } = require('express-validator');
const validatorMiddleware = require('../../Middleware/validatorMiddleware.js');
const { default: slugify } = require('slugify');
const bcrypt = require('bcryptjs');
const User = require('../../Models/user.js')

exports.getUserValidator = [
// 1- rules:
check('id').isMongoId().withMessage('Invalid brand id format'),
validatorMiddleware,
];

exports.createUserValidator = [
    check('name')
    .notEmpty().withMessage('name User is required')
    .isLength({min: 3 }).withMessage('too short User name')
    .custom((val,{req}) => {
        //name => slugify
        req.body.slug = slugify(val);
        return true;
    }),
    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) => 
    User.findOne({ email: val }).then((user) => {
        if(user) {
            return Promise.reject( new Error(' E-mail already in user'));
        }
    })
    ),

    check('password')
    .notEmpty()
    .withMessage(' password required')
    .isLength( {min: 6})
    .withMessage(' password must be at least 6 characters')
    .custom((val,{req}) => {
        if( val !== req.body.passwordConfirm ) {
            throw new Error('Password Confirmation incorrect ')
        }
        return true;
    }),

    check('passwordConfirm')
    .notEmpty()
    .withMessage(' password Confirmation required'),

    check("phone")
    .optional()
    .isMobilePhone(['ar-TN','ar-EG'])
    .withMessage('Invalid phone number only accepted TN and EG phone number'),

    check("profileImg").optional(),

    check("role").optional(),
    

    
    validatorMiddleware,
];

exports.updateUserValidator = [
    // 1- rules:
    check('id').isMongoId().withMessage('User not updated '),
    body('name').custom((val,{req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) => 
    User.findOne({ email: val }).then((user) => {
        if(user) {
            return Promise.reject( new Error(' E-mail already in user'));
        }
    })
    ),
   
    check("phone")
    .optional()
    .isMobilePhone(['ar-TN','ar-EG'])
    .withMessage('Invalid phone number only accepted TN and EG phone number'),

    check("profileImg").optional(),


    validatorMiddleware,
    ];
 exports.updateMeValidator = [
    body('name').custom((val,{req}) => {
        req.body.slug = slugify(val);
        return true;
    }),
    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) => 
    User.findOne({ email: val }).then((user) => {
        if(user) {
            return Promise.reject( new Error(' E-mail already in user'));
        }
    })
    ),
   
    check("phone")
    .optional()
    .isMobilePhone(['ar-TN','ar-EG'])
    .withMessage('Invalid phone number only accepted TN and EG phone number'),

    check("profileImg").optional(),

    check("role").optional(),

    validatorMiddleware,
      ];
exports.changeUserPasswordValidator = [
    check('id').isMongoId().withMessage('User not updated '),
    
    check('currentPassword')
    .notEmpty()
    .withMessage(' you must enter your current password'),
   
    check('passwordConfirm')
    .notEmpty()
    .withMessage(' you must enter your current password Confirm'),
   
    check('password')
    .notEmpty()
    .withMessage(' you must enter your new password')
    .custom( async (val,{req}) => {
        // verify current password( in DB ) with password in body:
        const user = await User.findById(req.params.id);
        if(!user) {
            throw new Error(' there is no user for this id ');
        }
        const isCorrectPassword = await bcrypt.compare(
            req.body.currentPassword,
            user.password
        );
        if(!isCorrectPassword) {
            throw new Error(' Incorrect current password');
        }

        //verify password confirm: 
        if(val !== req.body.passwordConfirm){
            throw new Error(' password Confirmation incorrect')
        }
        return true;
    }),
    validatorMiddleware,
]
exports.changeMePasswordValidator = [
    
    body('password')
      .notEmpty()
      .withMessage('New password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
   
  ];
  

exports.deleteUserValidator = [
    // 1- rules:
    check('id').isMongoId().withMessage('User not deleted'),
    validatorMiddleware,
    ];