const { usrSignUpsch } = require('../util/validation');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const constants = require('../util/constants');
const UserSignUp = async (req, res) => {
    try {
        
        // Validate the request body against the schema
        const { error, value } = usrSignUpsch.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: true,
                success: false
            });
        }

        // Extract validated values
        const { name, email, password, photo } = value;
        
        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: constants.ALREADY_EXISTS,
                error: true,
                success: false
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!hashedPassword) {
            throw new Error(constants.SERVER_ERROR);
        }

        // Create a new user
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            photo
        });

        // Save the user to the database
        const saveUser = await user.save();

        res.status(201).json({
            message: constants.USR_CRT_SUC,
            error: false,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: constants.USR_CRT_ERR,
            error: true,
            success: false
        });
    }
};

module.exports = { UserSignUp };
