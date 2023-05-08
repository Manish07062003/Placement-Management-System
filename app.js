if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const ejs_mate = require("ejs-mate");
const functions = require("./functions")
const method_override = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError")
const session = require("express-session")
const flash = require("connect-flash")
const User = require("./models/user.js")

// passport
const passport = require("passport");
const LocalStrategy = require("passport-local")

const JobDescriptionsRoute = require("./routes/jobDescriptions.js");
const UserRoute = require("./routes/user.js");
const ApplyJdAndDownloadStdRoute = require("./routes/applyJdAndDownloadStd.js");



mongoose.connect("mongodb://localhost:27017/placement_management_system", {

    // parses the data from the project and returns back in json format
    useNewUrlParser: true,

    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("database connected");
});

app.locals.functions = functions;



// set view engine to ejs
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "/views"));
app.engine('ejs', ejs_mate);

// to encode req.body data submitted using forms
app.use(express.urlencoded({ extended: true }));
// serving public folder
app.use(express.static(path.join(__dirname, 'public')));
// enabling method-override
app.use(method_override('_method'));
// session
const sessionConfig = {
    secret: "MySecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        // for security purposes
        // if this is enabled any client side script cannot access this cookie
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}

app.use(session(sessionConfig))


// enabling flash
app.use(flash())

// passport
app.use(passport.initialize())
app.use(passport.session())

// to check the username and password from the database
passport.use(new LocalStrategy(User.authenticate()))
// serializeUser() is setting id as cookie in user's browser and passport.
passport.serializeUser(User.serializeUser())
//  deserializeUser() is getting id from the cookie, which is then used in callback to get user info or something else, based on that id or some other piece of information from the cookie
passport.deserializeUser(User.deserializeUser())


app.use((req, res, next) => {
    // we can access success in templates without passing 
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.functions = functions;
    next()
})

app.use('/', UserRoute);

// handling routes starting with /jd and sending to routes/jobDescriptions
app.use('/jd', JobDescriptionsRoute);

app.use('/jd', ApplyJdAndDownloadStdRoute);







// runs atlast if the path doesn't match for above all routes
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})

// error handler middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "Oh no, Something went wrong!";
    res.status(statusCode).render("error.ejs", { err })
})


app.listen(3000, () => {
    console.log("listening on port 3000");
})