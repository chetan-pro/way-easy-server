const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const privacyType = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
});

privacyType.plugin(unqiueValidator, { message: "this type already exists." });


const PrivacyType = mongoose.model("privacyType", privacyType);
module.exports = PrivacyType;