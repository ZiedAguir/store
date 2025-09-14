const express = require('express');
const { protect, restrictTo } = require('../Middleware/authMiddleware');
const { createReport, listReports, resolveReport, deleteReport, deleteAllReports, listMyReports } = require('../Controllers/reportController');

const router = express.Router();

// User creates a report
router.post('/', protect, createReport);

// Admin views all reports
router.get('/', protect, restrictTo('admin','superadmin'), listReports);

// User views own reports
router.get('/mine', protect, listMyReports);

// Admin resolves a report
router.patch('/:id/resolve', protect, restrictTo('admin','superadmin'), resolveReport);

// Admin delete single report
router.delete('/:id', protect, restrictTo('admin','superadmin'), deleteReport);

// Admin delete all reports
router.delete('/', protect, restrictTo('admin','superadmin'), deleteAllReports);

module.exports = router;


