const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const foodType = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
});

foodType.plugin(unqiueValidator, { message: "this type already exists." });


const FoodType = mongoose.model("foodType", foodType);
module.exports = FoodType;