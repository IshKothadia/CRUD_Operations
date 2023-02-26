// user.js Isha Kothadia 301298827 26/02/2023 

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// create user schema
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        default: "",
        trim: true,
        required: "email address is required",
    },
    password: {
        type: String,
        default: "",
        trim: true,
        required: "password is required",
    },

});

// hash password using passport local mongoose plugin
// userSchema.plugin(passportLocalMongoose);

userSchema.plugin(passportLocalMongoose, {usernameField : "password"});

module.exports = mongoose.model('User', userSchema);
