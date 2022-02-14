const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const otherServicesSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
});

otherServicesSchema.plugin(unqiueValidator, { message: "this type already exists." });


const OtherServices = mongoose.model("otherServicesSchema", otherServicesSchema);
module.exports = OtherServices;