const express = require("express");
const app = express();
const ejs_mate = require("ejs-mate");
const functions = require("./functions")
const method_override = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const { jdSchema } = require("./joiSchemas")
const jdcontroller = require("./jdcontroller");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError")

mongoose.connect("mongodb://localhost:27017/placement_management_system", {

    // parses the data from the project and returns back in json format
    usenewurlparser: true,

    useunifiedtopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("database connected");
});

app.locals.functions = functions;


const validateJd = (req, res, next) => {
    console.log(req.body)
    const { error } = jdSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

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

// to display all jd's
app.get("/jd", catchAsync(async (req, res) => {
    const jds = await jdcontroller.getJds();
    res.render("jobdescription/index", { jds });
}))

// to create new jd
app.get("/jd/new", (req, res) => {
    res.render("jobdescription/new");
})

// to submit new jd to database
app.post("/jd", validateJd, catchAsync(async (req, res) => {
    jdcontroller.addJd(req.body);
    res.redirect("/jd");
}))
// to display selected jd
app.get("/jd/:id", catchAsync(async (req, res) => {
    const jd = await jdcontroller.getJdById(req.params.id);
    res.render("jobdescription/show", { jd});
}))

// to edit a particular jd
app.get("/jd/:id/edit", catchAsync(async (req, res) => {
    const jd = await jdcontroller.getJdById(req.params.id);
    res.render("jobdescription/edit", { jd });
}))

// to save the updated jd to db
app.put("/jd/:id", validateJd, catchAsync(async (req, res) => {
    const { id } = req.params;
    const jd = await jdcontroller.findJdAndUpdate(id, { ...req.body });
    res.redirect(`/jd/${jd.id}`);
}))
// delete a jd
app.delete("/jd/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await jdcontroller.findJdAndDelete(id);
    res.redirect('/jd');
}))


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