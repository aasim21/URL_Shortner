const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    short_id:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timeStamp: Number}],
    createdAt:{
        type:Number,
        default:Date.now(),
        required:true
    },
    expiresAt:{
        type:Number,
        default: Date.now() + 3 * 24 * 60 * 60 * 1000,
        required:true
    }
}, {timestamps: true})

const URL = mongoose.model('Url', urlSchema);

module.exports = URL;