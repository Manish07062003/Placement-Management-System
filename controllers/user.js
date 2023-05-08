const User = require('../models/user')
const functions = require('../functions')

// firebase
const { initializeApp } = require("firebase/app")
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage")
const { firebaseConfig } = require("../firebase/index")

// initializing firebase application
initializeApp(firebaseConfig)

const storage = getStorage();
module.exports.renderRegistrationForm = async (req, res) => {

    res.render("user/register");
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const dateTime = functions.giveCurrentDateTime();
        const storageRef = ref(storage, `Resumes/${req.file.originalname + " " + dateTime}`)

        // creating file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype
        };

        // upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        // by using uploadBytesResumable we can control the progress of uploading like pause ,resume

        const downloadURL = await getDownloadURL(snapshot.ref);

        const { username, name, email, phone_no, password, course, gender, tenth, twelve, graduation, masters, year_of_passing, skills } = req.body;

        const user = new User({ username, name, email, phone_no, course, gender, tenth, twelve, graduation, masters, year_of_passing, skills });

        user.resume = { url: downloadURL, filename: req.file.originalname }

        const registeredUser = await User.register(user, password)

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Successfully Create Your Profile")
            return res.redirect("/jd");
        });

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }


}

module.exports.renderLoginForm = async (req, res) => {
    res.render('user/login.ejs')
}

module.exports.login = async (req, res) => {
    const redirectUrl = res.locals.returnTo || '/jd';
    req.flash("success", 'Welcome Back!')
    res.redirect(redirectUrl)
}

module.exports.logout = async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged Out Successfully')
        res.redirect('/jd')
    })
}
