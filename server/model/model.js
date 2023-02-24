const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
        umique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

const contactDB = mongoose.model('contactdb',schema);

module.exports = contactDB;