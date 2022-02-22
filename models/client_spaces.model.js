const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSpaces = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    space_name: {
        type: String,
    },
    space_description: {
        type: String
    },
    space_images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spacesImages',
    }],
});

const ClientSpaces = mongoose.model("clientSpaces", clientSpaces);
module.exports = ClientSpaces;