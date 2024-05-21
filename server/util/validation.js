const Joi = require('joi');
const validationMessages = require('./validationMessages'); // Adjust the path as necessary

const usrSignUpsch = Joi.object({
    name: Joi.string().min(3).max(30).required().messages(validationMessages.name),
    email: Joi.string().email().required().messages(validationMessages.email),
    password: Joi.string().min(6).required().messages(validationMessages.password),
    photo: Joi.string().uri().optional().messages(validationMessages.photo),
    role: Joi.string().optional()
});

const usrSignInsch = Joi.object({
    email: Joi.string().email().required().messages(validationMessages.email),
    password: Joi.string().min(6).required().messages(validationMessages.password),
});

const usrUpdate = Joi.object({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages(validationMessages.id),
    name: Joi.string().min(3).max(30).required().messages(validationMessages.name),
    email: Joi.string().email().required().messages(validationMessages.email),
    photo: Joi.string().uri().optional().messages(validationMessages.photo),
    role: Joi.string().optional()
});

module.exports ={usrSignUpsch,usrSignInsch,usrUpdate}