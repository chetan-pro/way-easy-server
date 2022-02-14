const mongoose = require('mongoose');
const { Schema } = mongoose;
const unqiueValidator = require("mongoose-unique-validator");

const objDays = new Schema({
    name: {
        type: String,
        unique: true
    },
    full_name: {
        type: String,
    },
});

objDays.plugin(unqiueValidator, { message: "this type already exists." });


const ObjDays = mongoose.model("objDays", objDays);
module.exports = ObjDays;