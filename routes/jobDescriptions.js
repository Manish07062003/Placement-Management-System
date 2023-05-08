const express = require("express");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAdmin, validateJd } = require("../middleware")
const jobDescription = require("../controllers/jobDescription")
// router behaves like a middleware, we can pass router function to app.get() etc.
// capable only of performing middleware and routing functions
const router = express.Router();

// to display all jd's
router.get("/", catchAsync(jobDescription.index))

// to create new jd
router.get("/new", isAdmin, catchAsync(jobDescription.renderNewForm))

// to submit new jd to database
router.post("/", isAdmin, validateJd, catchAsync(jobDescription.createJobDescription))

// to display selected jd
router.get("/:id", catchAsync(jobDescription.showJobDescription))

// to edit a particular jd
router.get("/:id/edit", isAdmin, catchAsync(jobDescription.renderEditForm))

// to save the updated jd to db
router.put("/:id", isAdmin, validateJd, catchAsync(jobDescription.updateJobDescription))

// delete a jd
router.delete("/:id", isAdmin, catchAsync(jobDescription.deleteJobDescription))


module.exports = router;