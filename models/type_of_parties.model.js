const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const typeOfPartiesSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
});

typeOfPartiesSchema.plugin(unqiueValidator, { message: "this type already exists." });


const TypeOfParty = mongoose.model("typeOfPartiesSchema", typeOfPartiesSchema);
module.exports = TypeOfParty;