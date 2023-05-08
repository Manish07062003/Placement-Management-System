const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const { Schema } = mongoose;

const resumeSchema = new Schema({
    url: String,
    filename: String
})

const UserSchema = new Schema({
    name: {
        type: String,
    },
    phone_no: {
        type: Number,
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
    },
    course: {
        type: String,
    },
    tenth: {
        type: Number,
    },
    twelve: {
        type: Number,
    },
    graduation: {
        type: Number,
    },
    masters: {
        type: Number,
    },
    resume: resumeSchema,
    year_of_passing: {
        type: Number,
    },
    skills: {
        type: String,
    },
    isAdmin: {
        type: Number,
        default: 0
    }
})

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);