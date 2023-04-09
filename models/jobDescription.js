const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobDescriptionSchema = new Schema({
    position_name: {
        type: String
    },
    experience: {
        from: {
            type: Number
        },
        to: {
            type: Number
        },
        single: {
            type: Number
        }
    },
    current_location: {
        type: String
    },
    description: {
        type: String
    },
    salary: {
        from: {
            type: Number
        },
        to: {
            type: Number
        },
        single: {
            type: Number
        }
    },
    course: {
        type: String,
    },
    company: {
        type: String
    },
    designation: {
        type: String
    },
    job_type: {
        type: String,
        enum: ["internship", "full_time", "internship_full_time"]
    },
    tenth: {
        type: Number
    },
    twelve: {
        type: Number
    },

    graduation: {
        type: Number
    },
    masters: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["all_candidates", "male", "female"],
        default: "all_candidates"
    },
    candidate_category: {
        type: String,
    },
    candidate_age: {
        from: {
            type: Number
        },
        to: {
            type: Number
        },
        single: {
            type: Number
        }
    },
    candidate_skills: {
        type: String
    }
});

module.exports = mongoose.model("JobDescription", jobDescriptionSchema);