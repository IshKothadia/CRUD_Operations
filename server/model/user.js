const mongoose = require('mongoose');
// const passportLocal = require('passport-local');
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
