const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const typeOfPlaceSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
});

typeOfPlaceSchema.plugin(unqiueValidator, { message: "this type is already exists." });


const TypeOfPlace = mongoose.model("typeOfPlaceSchema", typeOfPlaceSchema);
module.exports = TypeOfPlace;