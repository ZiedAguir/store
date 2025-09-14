const asyncHandler = require('express-async-handler');
const Report = require('../Models/reportModel');
const ApiError = require('../utils/apiError');

// Create a report
exports.createReport = asyncHandler(async (req, res, next) => {
  const { productId, reason } = req.body;
  if (!productId || !reason) return next(new ApiError('productId and reason are required', 400));
  const reporterId = req.user?._id || req.user?.id;
  if (!reporterId) return next(new ApiError('Unauthorized', 401));
  const report = await Report.create({ product: productId, reporter: reporterId, reason });
  res.status(201).json({ status: 'success', data: report });
});

// List reports (admin/superadmin)
exports.listReports = asyncHandler(async (req, res, next) => {
  const reports = await Report.find({})
    .sort({ createdAt: -1 })
    .populate('product', 'title imageCover price')
    .populate('reporter', 'name email');
  res.status(200).json({ status: 'success', results: reports.length, data: reports });
});

// List current user's reports
exports.listMyReports = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id || req.user?.id;
  if (!userId) return next(new ApiError('Unauthorized', 401));
  const reports = await Report.find({ reporter: userId })
    .sort({ createdAt: -1 })
    .populate('product', 'title imageCover price');
  res.status(200).json({ status: 'success', results: reports.length, data: reports });
});

// Resolve a report
exports.resolveReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findByIdAndUpdate(id, { status: 'resolved' }, { new: true });
  if (!report) return next(new ApiError('Report not found', 404));
  res.status(200).json({ status: 'success', data: report });
});

// Delete a report
exports.deleteReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findByIdAndDelete(id);
  if (!report) return next(new ApiError('Report not found', 404));
  res.status(200).json({ status: 'success', message: 'Report deleted' });
});

// Delete all reports
exports.deleteAllReports = asyncHandler(async (req, res, next) => {
  await Report.deleteMany({});
  res.status(200).json({ status: 'success', message: 'All reports deleted' });
});


