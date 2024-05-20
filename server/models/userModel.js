const mongoose = require('mongoose');

const usrSignUpsch = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role:{
        type: String,
        default: 'USER'
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String, 
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', usrSignUpsch);

module.exports = User;
