const { check, body } = require('express-validator');
const validatorMiddleware = require('../../Middleware/validatorMiddleware.js');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const User = require('../../Models/user.js');

exports.signUpValidator = [

    check('name')
    .notEmpty().withMessage('name User is required')
    .isLength({min: 3 }).withMessage('too short User name')
    .custom((val,{req}) => {
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
            return Promise.reject( new Error(' E-mail already in use'));
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

    check('country')
    .notEmpty()
    .withMessage('Country selection is required')
    .isLength({min: 2})
    .withMessage('Please select a valid country'),

    // Note: Role is automatically set to "user" in the controller
    
    
    validatorMiddleware,
];

exports.loginValidator = [
    
    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),
    
    check('password')
    .notEmpty()
    .withMessage(' password required')
    .isLength( {min: 6})
    .withMessage(' password must be at least 6 characters'),
    
    validatorMiddleware,

]