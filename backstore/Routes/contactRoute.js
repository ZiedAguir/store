const express = require('express');
const { sendContactMessage } = require('../Controllers/contactController');

const router = express.Router();

// Contact form routes
router.post('/', sendContactMessage);

module.exports = router;
