const { jdSchema } = require("./joiSchemas")

module.exports.isUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // req.session.returnTo = req.originalUrl
        req.flash("error", "You Must Be Logged In First")
        return res.redirect("/login")
    } else if (req.isAuthenticated() && req.user.isAdmin) {
        req.flash("error", "You Must Be Logged In As User")
        return res.redirect('/login')
    }
    next()
}

module.exports.validateJd = (req, res, next) => {
    const { error } = jdSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        // req.session.returnTo = req.originalUrl
        return next()
    }
    req.flash("error", "You Must Log In As Admin")
    res.redirect("/jd")
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        // res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.checkFields = (req, res, next) => {
    const fields = req.body
    if (!fields.registration_no && !fields.name && !fields.phone_no && !fields.tenth && !fields.twelve && !fields.masters && !fields.graduation && !fields.year_of_passing && !fields.course && !fields.skills && !fields.resume && !fields.gender && !fields.email) {
        req.flash("error", "Select Atleast One Field");
        return res.redirect(`/jd/${req.params.id}/AppliedStudents`);
    }
    next();
}