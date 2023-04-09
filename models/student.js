const mongoose = require("mongoose");
const { Schema } = mongoose;


const StudentSchema = new Schema({
    registration_id: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    phone_no: Number,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
})