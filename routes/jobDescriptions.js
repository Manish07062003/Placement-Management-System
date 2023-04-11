const express = require("express");
const catchAsync = require("../utils/catchAsync");
const jdController = require("../jdController");
const ExpressError = require("../utils/ExpressError")
const { jdSchema } = require("../joiSchemas")
// router behaves like a middleware, we can pass router function to app.get() etc.
// capable only of performing middleware and routing functions
const router = express.Router();


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

// to display all jd's
router.get("/", catchAsync(async (req, res) => {
    const jds = await jdController.getJds();
    res.render("jobdescription/index", { jds });
}))

// to create new jd
router.get("/new", (req, res) => {
    res.render("jobdescription/new");
})

// to submit new jd to database
router.post("/", validateJd, catchAsync(async (req, res) => {
    const jd = await jdController.addJd(req.body);
    req.flash("success", "Successfully Created A New Job Description")
    res.redirect(`/jd/${jd.id}`);
}))
// to display selected jd
router.get("/:id", catchAsync(async (req, res) => {
    const jd = await jdController.getJdById(req.params.id);
    if (!jd) {
        req.flash("error", "Cannot Find The Job Description")
        res.redirect("/jd");
    }
    res.render("jobdescription/show", { jd });
}))

// to edit a particular jd
router.get("/:id/edit", catchAsync(async (req, res) => {
    const jd = await jdController.getJdById(req.params.id);
     if (!jd) {
        req.flash("error", "Cannot Find The Job Description")
        res.redirect("/jd");
    }
    res.render("jobdescription/edit", { jd });
}))

// to save the updated jd to db
router.put("/:id", validateJd, catchAsync(async (req, res) => {
    const { id } = req.params;
    const jd = await jdController.findJdAndUpdate(id, { ...req.body });
    req.flash("success", "Successfully Updated The Job Description")
    res.redirect(`/jd/${jd.id}`);
}))
// delete a jd
router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await jdController.findJdAndDelete(id);
    req.flash("success", "Successfully Deleted The Job Description")
    res.redirect('/jd');
}))


module.exports = router;