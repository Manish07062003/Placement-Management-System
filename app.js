const express = require("express");
const app = express();
const ejs_mate = require("ejs-mate");
const functions = require("./functions")
const method_override = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError")
const session = require("express-session")
const flash = require("connect-flash")

const jobDescriptions = require("./routes/jobDescriptions.js")


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
    secret: "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        // for security purposes
        // if this is enables any client side script cannot access this cookie
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}
app.use(session(sessionConfig))


// enabling flash
app.use(flash())


app.use((req, res, next) => {
    // we can access success in templates without passing 
    res.locals.success = req.flash("success")
    res.locals.error= req.flash("error")
    res.locals.functions = functions;
    next()
})

// handling routes starting with /jd and sending to routes/jobDescriptions
app.use('/jd', jobDescriptions);


app.get("/register", (req, res) => {
    res.render("user/register");
});
app.post('/register', (req, res) => {
    res.redirect('/register');
})

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