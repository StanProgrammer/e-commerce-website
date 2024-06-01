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

const productSchema = Joi.object({
    id: Joi.string().optional().pattern(/^[0-9a-fA-F]{24}$/).messages(validationMessages.id),
    productName: Joi.string().min(3).max(50).required().messages(validationMessages.productName),
    brandName: Joi.string().min(3).max(50).required().messages(validationMessages.brandName),
    category: Joi.string().required().messages(validationMessages.category),
    productImage: Joi.array().items(Joi.string().uri()).min(1).required().messages(validationMessages.productImage),
    description: Joi.string().required().messages(validationMessages.description),
    price: Joi.number().required().messages(validationMessages.price),
    selling: Joi.number().required().messages(validationMessages.selling),
});

module.exports = { usrSignUpsch, usrSignInsch, usrUpdate, productSchema };
