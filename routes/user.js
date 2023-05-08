const express = require("express")
const router = express.Router();
const User = require("../models/user")
const catchAsync = require("../utils/catchAsync");
const functions = require("../functions")
const passport = require("passport")
const users = require('../controllers/user')

const { storeReturnTo } = require('../middleware')

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
//Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const multer = require("multer")

// upload the files in storage(it has in credentials of our acct and in which folder to store)
const upload = multer({ storage: multer.memoryStorage() })


router.get("/register", catchAsync(users.renderRegistrationForm));

router.post("/register", upload.single('resume'), catchAsync(users.registerUser))

router.get("/login", catchAsync(users.renderLoginForm))

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(users.login))

router.get("/logout", catchAsync(users.logout))

module.exports = router;

