const Joi = require("Joi");

module.exports.jdSchema = Joi.object({
    position_name: Joi.string().required(),
    experience: Joi.object({
        from: Joi.number().required().min(0).max(100).allow(''),
        to: Joi.number().required().min(0).max(100).allow(''),
        single: Joi.number().required().min(0).max(100).allow('')
    }),
    current_location: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.object({
        from: Joi.number().required().min(0).allow(''),
        to: Joi.number().required().min(0).allow(''),
        single: Joi.number().required().min(1).allow('')
    }),
    course: Joi.string().required().allow(''),
    company: Joi.string().required(),
    designation: Joi.string().allow(''),
    job_type: Joi.string().required().valid("internship", "full_time", "internship_full_time"),
    tenth: Joi.number().allow('').min(0).max(100),
    twelve: Joi.number().allow('').min(0).max(100),
    graduation: Joi.number().min(0).max(100).allow(''),
    masters: Joi.number().min(0).max(100).allow(''),
    gender: Joi.string().required().valid("all_candidates", "male", "female"),
    candidate_category: Joi.string().allow(''),
    candidate_age: Joi.object({
        from: Joi.number().required().min(0).max(100).allow(''),
        to: Joi.number().required().min(0).max(100).allow(''),
        single: Joi.number().required().min(0).max(100).allow('')
    }),
    candidate_skills: Joi.string().required()
})