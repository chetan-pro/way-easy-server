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
    virtual_video_url: {
        type: String,
    },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
    },
    address: {
        type: String
    }
});

const ClientSpaces = mongoose.model("clientSpaces", clientSpaces);
module.exports = ClientSpaces;