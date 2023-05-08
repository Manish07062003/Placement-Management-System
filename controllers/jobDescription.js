const JobDescription = require("../models/jobDescription")


module.exports.index = async (req, res) => {
    const jds = await JobDescription.find({});
    res.render("jobdescription/index", { jds });
}

module.exports.renderNewForm = async (req, res) => {
    res.render("jobdescription/new");
}

module.exports.createJobDescription = async (req, res) => {
    const jd = new JobDescription(req.body);
    await jd.save();
    req.flash("success", "Successfully Created A New Job Description")
    res.redirect(`/jd/${jd.id}`);
}

module.exports.showJobDescription = async (req, res) => {
    const jd = await JobDescription.findById(req.params.id);
    if (!jd) {
        req.flash("error", "Cannot Find The Job Description")
        res.redirect("/jd");
    }
    let isApplied = false
    if (req.user) {
        for (let id of jd.applied_students) {
            if (req.user._id.equals(id)) {
                isApplied = true
            }
        }
    }
    res.render("jobdescription/show", { jd, isApplied });
}

module.exports.renderEditForm = async (req, res) => {
    const jd = await JobDescription.findById(req.params.id);
    if (!jd) {
        req.flash("error", "Cannot Find The Job Description")
        res.redirect("/jd");
    }
    res.render("jobdescription/edit", { jd });
}

module.exports.updateJobDescription = async (req, res) => {
    const { id } = req.params;
    const jd = await JobDescription.findByIdAndUpdate(id, { ...req.body });
    req.flash("success", "Successfully Updated The Job Description")
    res.redirect(`/jd/${jd.id}`);
}

module.exports.deleteJobDescription = async (req, res) => {
    const { id } = req.params;
    await JobDescription.findByIdAndDelete(id);
    req.flash("success", "Successfully Deleted The Job Description")
    res.redirect('/jd');
}
