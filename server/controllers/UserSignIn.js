const { usrSignInsch } = require('../util/validation');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../util/constants');
const { JWT_SECRET } = process.env;

const UserSignIn = async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error, value } = usrSignInsch.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: true,
                success: false
            });
        }

        // Extract validated values
        const { email, password } = value;

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: constants.USR_NOT_FOUND,
                error: true,
                success: false
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: constants.INVALID_CREDENTIALS,
                error: true,
                success: false
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, JWT_SECRET, {
            expiresIn: '9h'
        });
        const tokenOption = {
            httpOnly: true,
            secure: true
        }

        res.cookie("token",token,tokenOption).status(200).json({
            message: constants.USR_SIGNIN_SUC,
            data:token,
            error: false,
            success: true
        });

    } catch (error) {
        throw new Error(error)

    }
};

module.exports = { UserSignIn };
