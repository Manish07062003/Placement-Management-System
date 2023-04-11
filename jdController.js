const JobDescription = require('./models/jobDescription')
class jdController {
    async getJds() {
        const jds = await JobDescription.find({});
        return jds;
    }
    async addJd(jobDescription) {
        const jd = new JobDescription(jobDescription);
        await jd.save();
        return jd;
    }
    async getJdById(id) {
        return await JobDescription.findById(id);
    }
    async findJdAndUpdate(id, data) {
        const jd = await JobDescription.findByIdAndUpdate(id, data);
        return jd;
    }
    async findJdAndDelete(id) {
        await JobDescription.findByIdAndDelete(id);
    }
}


module.exports = new jdController();