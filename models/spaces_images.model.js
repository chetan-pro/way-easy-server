const mongoose = require('mongoose');
const { Schema } = mongoose;

const spacesImages = new Schema({
    client_space_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientSpaces',
    },
    image_url: {
        type: String,
    },
});



const SpacesImages = mongoose.model("spacesImages", spacesImages);
module.exports = SpacesImages;