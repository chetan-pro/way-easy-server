const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const typeOfPlaceSpaces = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
});

typeOfPlaceSpaces.plugin(unqiueValidator, { message: "this type is already exists." });


const TypeOfSpace = mongoose.model("typeOfPlaceSpaces", typeOfPlaceSpaces);
module.exports = TypeOfSpace;