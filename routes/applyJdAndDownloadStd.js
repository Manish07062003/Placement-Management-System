const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const { isUser, checkFields, isAdmin } = require("../middleware")
const applyJdAndDownloadStd = require('../controllers/applyJdAndDownloadStd')

router.post('/:id/apply', isUser, catchAsync(applyJdAndDownloadStd.applyForJobDescription))

router.put('/:id/cancelApply', isUser, catchAsync(applyJdAndDownloadStd.cancelApplyForJobDescription))

router.get('/:id/AppliedStudents', isAdmin, catchAsync(applyJdAndDownloadStd.renderAppliedStudentsForm))

router.post("/:id/downloadAppliedStudents", isAdmin, checkFields, catchAsync(applyJdAndDownloadStd.downloadAppliedStudentsDetails))

module.exports = router;