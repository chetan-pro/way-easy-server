const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        min: 6
    },
    mobile_number: {
        type: Number,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    image: {
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
    date: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.set("toJSON", {
    transform: (document,
        returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    },
});

userSchema.plugin(unqiueValidator, { message: "Mobile Number already exists." });

const User = mongoose.model("user", userSchema);
module.exports = User;