const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const clientSchema = new Schema({
    owner_name: {
        type: String,
    },
    place_name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        min: 6
    },
    owner_phonenumber: {
        type: Number,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    manager_phonenumber: {
        type: Number,
        minlength: 10,
        maxlength: 10
    },
    status: {
        type: Boolean
    },
    max_capacity: {
        type: Number,
    },
    address: {
        type: String
    },
    logo: {
        type: String,
    },
    locality: {
        type: String,
    },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
    },
    token: {
        type: String,
        unique: true
    },
    allow_outside_dj: {
        type: Boolean
    },
    allow_outside_decoration: {
        type: Boolean
    },
    virtual_video_url: {
        type: String
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientImages',
    }],
    date: {
        type: Date,
        default: Date.now(),
    },
});

clientSchema.set("toJSON", {
    transform: (document,
        returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    },
});

clientSchema.plugin(unqiueValidator, { message: "Mobile Number already exists." });

const User = mongoose.model("client", clientSchema);
module.exports = User;