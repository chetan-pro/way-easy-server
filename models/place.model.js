const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const placeSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
});

placeSchema.plugin(unqiueValidator, { message: "Place already exists." });


const Place = mongoose.model("place", placeSchema);
module.exports = Place;