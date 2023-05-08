const JobDescription = require('../models/jobDescription')
const excelJs = require('exceljs')

module.exports.applyForJobDescription = async (req, res) => {
    await JobDescription.findByIdAndUpdate(req.params.id, { $pull: { applied_students: req.user._id } })
    const jd = await JobDescription.findById(req.params.id);
    jd.applied_students.push(req.user);
    await jd.save();
    req.flash("success", "Successfully Applied For the Job")
    res.redirect(`/jd/${jd._id}`)
}

module.exports.cancelApplyForJobDescription = async (req, res) => {
    const { id } = req.params;
    await JobDescription.findByIdAndUpdate(id, { $pull: { applied_students: req.user._id } })
    req.flash("success", "Successfully Deapplied For the Job")
    res.redirect(`/jd/${id}`)
}
module.exports.renderAppliedStudentsForm = async (req, res) => {
    const jd = await JobDescription.findById(req.params.id);
    res.render('AppliedStudents', { jd })
}

module.exports.downloadAppliedStudentsDetails = async (req, res) => {
    const jd = await JobDescription.findById(req.params.id).populate('applied_students');
    const fieldsRequired = req.body;
    const applied_students = jd.applied_students.map(obj => {
        obj.resume = obj.resume.url
        return obj
    });
    const workbook = new excelJs.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    const worksheetHeaders = []
    for (let field in fieldsRequired) {
        const header = { header: field, key: fieldsRequired[field], width: 20 }
        worksheetHeaders.push(header)
    }
    worksheet.columns = worksheetHeaders
    applied_students.forEach((std) => {
        std.resume = std.resume.url;
        worksheet.addRow(std);
    });
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true }
    })
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.setHeader("Content-Diposition", `attachment; filename=studentDetails.xlsx`)
    return workbook.xlsx.write(res).then(() => {
        res.status(200);
    })
}